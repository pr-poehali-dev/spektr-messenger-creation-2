import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
import hashlib
import secrets

def handler(event: dict, context) -> dict:
    '''API для регистрации и авторизации пользователей Spektr'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        db_url = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(db_url)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'register':
                email = body.get('email')
                username = body.get('username')
                name = body.get('name')
                password = body.get('password')
                avatar_url = body.get('avatar_url', '')
                
                if not all([email, username, name, password]):
                    return response(400, {'error': 'Заполните все поля'})
                
                cursor.execute(
                    'SELECT id FROM users WHERE email = %s OR username = %s',
                    (email, username)
                )
                existing = cursor.fetchone()
                
                if existing:
                    return response(400, {'error': 'Email или username уже занят'})
                
                password_hash = hashlib.sha256(password.encode()).hexdigest()
                token = secrets.token_urlsafe(32)
                
                cursor.execute('''
                    INSERT INTO users (email, username, name, password_hash, avatar_url, theme, is_verified, is_admin, created_at, updated_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                    RETURNING id, email, username, name, avatar_url, theme, is_verified
                ''', (email, username, name, password_hash, avatar_url, 'purple', False, False))
                
                user = cursor.fetchone()
                conn.commit()
                
                return response(200, {
                    'user': dict(user),
                    'token': token
                })
            
            elif action == 'login':
                email = body.get('email')
                password = body.get('password')
                
                if not all([email, password]):
                    return response(400, {'error': 'Заполните все поля'})
                
                password_hash = hashlib.sha256(password.encode()).hexdigest()
                
                cursor.execute('''
                    SELECT id, email, username, name, avatar_url, theme, is_verified, is_admin
                    FROM users WHERE email = %s AND password_hash = %s
                ''', (email, password_hash))
                
                user = cursor.fetchone()
                
                if not user:
                    return response(401, {'error': 'Неверный email или пароль'})
                
                token = secrets.token_urlsafe(32)
                
                return response(200, {
                    'user': dict(user),
                    'token': token
                })
        
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
        'body': json.dumps(data, ensure_ascii=False),
        'isBase64Encoded': False
    }
