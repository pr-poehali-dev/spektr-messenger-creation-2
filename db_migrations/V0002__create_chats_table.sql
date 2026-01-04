CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    name VARCHAR(100),
    username VARCHAR(50) UNIQUE,
    description TEXT,
    avatar_url TEXT,
    is_verified BOOLEAN,
    created_by INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);