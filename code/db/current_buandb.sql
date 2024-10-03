-- Created by Natasya Liew, Input by Ananya Singh
-- UPDATED WORKING DB

-- TABLE: users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    auth_id VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password_hash VARCHAR(50) NOT NULL,
    f_name VARCHAR(50) NOT NULL,
    l_name VARCHAR(50) NOT NULL,
    program_code VARCHAR(10) NOT NULL,
    course_taken JSONB, -- List of Integer
    path_interest VARCHAR(25),
    course_to_take INT,
);

-- TABLE: sessions
CREATE TABLE sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Previous Click New chat timestamp
    end_chattime TIMESTAMP WITH TIME ZONE, -- Next Click New Chat timestamp
    conversation JSONB
);


-- Indexes
-- Index for foreign key user_id in sessions table
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

-- Indexes for USERS table
CREATE INDEX idx_users_f_name ON users(f_name);
CREATE INDEX idx_users_program_code ON users(program_code);
CREATE INDEX idx_users_course_taken ON users(course_taken);
CREATE INDEX idx_users_course_to_take ON users(course_to_take);
CREATE INDEX idx_users_path_interest ON users(path_interest);

-- Indexes for sessions table
CREATE INDEX idx_sessions_conversation ON sessions(conversation);
CREATE INDEX idx_sessions_created_at ON sessions(created_at);


