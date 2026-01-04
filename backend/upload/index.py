import json
import os
import boto3
import base64
import secrets

def handler(event: dict, context) -> dict:
    '''API для загрузки файлов (изображения, видео, аудио) в S3'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return response(405, {'error': 'Method not allowed'})
    
    try:
        body = json.loads(event.get('body', '{}'))
        file_data = body.get('file')
        file_name = body.get('filename')
        content_type = body.get('content_type', 'application/octet-stream')
        
        if not all([file_data, file_name]):
            return response(400, {'error': 'file and filename required'})
        
        file_bytes = base64.b64decode(file_data)
        
        s3 = boto3.client('s3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        )
        
        unique_filename = f"spektr/{secrets.token_hex(8)}_{file_name}"
        
        s3.put_object(
            Bucket='files',
            Key=unique_filename,
            Body=file_bytes,
            ContentType=content_type
        )
        
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{unique_filename}"
        
        return response(200, {
            'url': cdn_url,
            'filename': unique_filename
        })
        
    except Exception as e:
        return response(500, {'error': str(e)})

def response(status_code: int, data: dict) -> dict:
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(data, ensure_ascii=False),
        'isBase64Encoded': False
    }
