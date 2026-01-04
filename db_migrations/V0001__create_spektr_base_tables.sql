CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    status TEXT,
    bio TEXT,
    is_verified BOOLEAN,
    is_admin BOOLEAN,
    theme VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);