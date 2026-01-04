CREATE TABLE chat_members (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    role VARCHAR(20),
    is_blocked BOOLEAN,
    joined_at TIMESTAMP
);

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    is_favorite BOOLEAN,
    added_at TIMESTAMP
);

CREATE TABLE blocked_users (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    blocked_user_id INTEGER NOT NULL,
    blocked_at TIMESTAMP
);