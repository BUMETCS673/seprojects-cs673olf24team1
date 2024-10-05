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


INSERT INTO users (auth_id, email, password_hash, f_name, l_name, program_code, course_taken, path_interest, course_to_take)
VALUES 
('auth_001', 'user1@example.com', 'hashed_password1', 'Alice', 'Smith', 'CS101', '["521"]', 'AI', 1),
('auth_002', 'user2@example.com', 'hashed_password2', 'Bob', 'Johnson', 'CS102', '["522"]', 'Web Development', 2),
('auth_003', 'user3@example.com', 'hashed_password3', 'Charlie', 'Brown', 'CS103', '["523"]', 'Data Science', 3);

INSERT INTO users (auth_id, email, password_hash, f_name, l_name, program_code, course_taken, path_interest, course_to_take)
VALUES 
('auth_004', 'user4@example.com', 'hashed_password4', 'Diana', 'Green', 'CS104', '["521", "522", "523"]', 'Machine Learning', 4);


select * from users;
select * from sessions; 

INSERT INTO sessions (user_id, end_chattime, conversation)
VALUES 
(1, '2024-10-01T12:00:00Z', '[
    {"user": "Hi", "chatbot": "Hey there"},
    {"user": "How can I start learning?", "chatbot": "You can begin with our introductory courses."}
]'),
(2, '2024-10-01T12:05:00Z', '[
    {"user": "What courses do you offer?", "chatbot": "We have a variety of courses in different fields."},
    {"user": "Can you recommend something?", "chatbot": "Sure! I recommend starting with Python for beginners."}
]'),
(3, '2024-10-01T12:10:00Z', '[
    {"user": "Hello", "chatbot": "Hi! How can I assist you today?"},
    {"user": "Tell me about Data Science", "chatbot": "Data Science involves using statistical methods and algorithms to analyze data."}
]');

INSERT INTO sessions (user_id, end_chattime, conversation)
VALUES 
(2, '2024-10-01T12:05:00Z', '[
    {"user": "What courses do you offer?", "chatbot": "We have a variety of courses in different fields."},
    {"user": "Can you recommend something?", "chatbot": "Sure! I recommend starting with Python for beginners."}
]'),
(2, '2024-10-01T12:15:00Z', '[
    {"user": "What is the duration of the courses?", "chatbot": "Most courses range from 4 to 12 weeks."},
    {"user": "Are there any prerequisites?", "chatbot": "Some courses require prior knowledge, but many are beginner-friendly."}
]'),
(2, '2024-10-01T12:25:00Z', '[
    {"user": "Do you offer certificates?", "chatbot": "Yes, you will receive a certificate upon course completion."},
    {"user": "How do I enroll?", "chatbot": "You can enroll directly through our website."}
]'),
(2, '2024-10-01T12:35:00Z', '[
    {"user": "Can I learn at my own pace?", "chatbot": "Absolutely! Most of our courses are self-paced."},
    {"user": "What payment options do you have?", "chatbot": "We accept various payment methods including credit cards and PayPal."}
]'),
(2, '2024-10-01T12:45:00Z', '[
    {"user": "Is there any support available?", "chatbot": "Yes, we offer support through email and live chat."},
    {"user": "How can I contact support?", "chatbot": "You can reach out to support via our contact page."}
]'),
(2, '2024-10-01T12:55:00Z', '[
    {"user": "Can I access the course materials later?", "chatbot": "Yes, you will have lifetime access to course materials."},
    {"user": "What happens if I miss a live session?", "chatbot": "All live sessions are recorded, and you can watch them later."}
]');

SELECT *
FROM sessions
WHERE user_id = 2;