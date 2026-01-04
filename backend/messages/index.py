import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для работы с сообщениями: отправка, получение, редактирование, удаление'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        db_url = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(db_url)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            chat_id = event.get('queryStringParameters', {}).get('chat_id')
            
            if not chat_id:
                return response(400, {'error': 'chat_id required'})
            
            cursor.execute('''
                SELECT m.id, m.chat_id, m.sender_id, m.content, m.message_type, m.file_url,
                       m.reply_to, m.forwarded_from, m.is_edited, m.is_deleted,
                       m.created_at, m.updated_at,
                       u.username, u.name, u.avatar_url
                FROM messages m
                JOIN users u ON m.sender_id = u.id
                WHERE m.chat_id = %s AND m.is_deleted = FALSE
                ORDER BY m.created_at ASC
            ''', (chat_id,))
            
            messages = cursor.fetchall()
            
            return response(200, {
                'messages': [dict(msg) for msg in messages]
            })
        
        elif method == 'POST':
            body = json.loads(event.get('body', '{}'))
            chat_id = body.get('chat_id')
            sender_id = body.get('sender_id')
            content = body.get('content')
            message_type = body.get('message_type', 'text')
            file_url = body.get('file_url')
            reply_to = body.get('reply_to')
            
            if not all([chat_id, sender_id]):
                return response(400, {'error': 'chat_id and sender_id required'})
            
            cursor.execute('''
                INSERT INTO messages (chat_id, sender_id, content, message_type, file_url, reply_to, is_edited, is_deleted, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                RETURNING id, chat_id, sender_id, content, message_type, file_url, reply_to, created_at
            ''', (chat_id, sender_id, content, message_type, file_url, reply_to, False, False))
            
            message = cursor.fetchone()
            conn.commit()
            
            return response(200, {'message': dict(message)})
        
        elif method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            message_id = body.get('message_id')
            content = body.get('content')
            
            if not all([message_id, content]):
                return response(400, {'error': 'message_id and content required'})
            
            cursor.execute('''
                UPDATE messages
                SET content = %s, is_edited = TRUE, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                RETURNING id, content, is_edited, updated_at
            ''', (content, message_id))
            
            message = cursor.fetchone()
            conn.commit()
            
            return response(200, {'message': dict(message)})
        
        elif method == 'DELETE':
            body = json.loads(event.get('body', '{}'))
            message_id = body.get('message_id')
            
            if not message_id:
                return response(400, {'error': 'message_id required'})
            
            cursor.execute('''
                UPDATE messages
                SET is_deleted = TRUE, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
            ''', (message_id,))
            
            conn.commit()
            
            return response(200, {'success': True})
        
        return response(405, {'error': 'Method not allowed'})
        
    except Exception as e:
        return response(500, {'error': str(e)})
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()

def response(status_code: int, data: dict) -> dict:
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(data, ensure_ascii=False, default=str),
        'isBase64Encoded': False
    }
