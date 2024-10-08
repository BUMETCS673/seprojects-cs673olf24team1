CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    user_preferences JSONB
);

CREATE TABLE chat_history (
    chat_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    conversation JSONB NOT NULL,
    metadata JSONB
);

CREATE INDEX idx_chat_history_user_id ON chat_history(user_id);

select * from users u ;

select * from chat_history ch ;


INSERT INTO users (username, email, password_hash, user_preferences) VALUES
('john_doe', 'john.doe@example.com', 'hashed_password_1', '{"theme": "dark", "notifications": true}'),
('jane_smith', 'jane.smith@example.com', 'hashed_password_2', '{"theme": "light", "notifications": false}');


INSERT INTO chat_history (user_id, conversation, metadata) VALUES
(1, '{"messages": [{"role": "user", "content": "What courses are available for Computer Science?"}, {"role": "assistant", "content": "There are several courses available for Computer Science. Some popular ones include: Introduction to Programming, Data Structures and Algorithms, Database Systems, and Machine Learning. Would you like more information about any specific course?"}]}', '{"session_duration": 120, "user_satisfaction": 4}'),

(1, '{"messages": [{"role": "user", "content": "Tell me more about the Machine Learning course."}, {"role": "assistant", "content": "The Machine Learning course covers fundamental concepts of ML, including supervised and unsupervised learning, neural networks, and deep learning. Prerequisites usually include linear algebra and probability theory. The course involves programming assignments, typically in Python. Would you like to know about the course duration or credit hours?"}]}', '{"session_duration": 180, "user_satisfaction": 5}'),

(2, '{"messages": [{"role": "user", "content": "What are the prerequisites for the Database Systems course?"}, {"role": "assistant", "content": "The prerequisites for the Database Systems course typically include: 1) Introduction to Programming, 2) Data Structures and Algorithms. Some programs might also require discrete mathematics. Do you meet these prerequisites?"}]}', '{"session_duration": 90, "user_satisfaction": 4}'),

(2, '{"messages": [{"role": "user", "content": "Can you recommend a course schedule for my first semester?"}, {"role": "assistant", "content": "Certainly! For a typical first semester in Computer Science, I would recommend: 1) Introduction to Programming, 2) Discrete Mathematics, 3) A general education course like English Composition, and 4) An elective of your choice, perhaps an introductory course in a field you''re interested in. How does this sound to you?"}]}', '{"session_duration": 240, "user_satisfaction": 5}'),

(1, '{"messages": [{"role": "user", "content": "What programming languages are taught in the Introduction to Programming course?"}, {"role": "assistant", "content": "The programming languages taught in Introduction to Programming can vary depending on the institution, but common choices include: 1) Python, due to its readability and versatility, 2) Java, which is widely used in industry, or 3) C++, which provides a good foundation for understanding lower-level concepts. Some courses might introduce multiple languages. Would you like to know which language our institution uses?"}]}', '{"session_duration": 150, "user_satisfaction": 4}');

SELECT 
    u.user_id,
    u.username,
    u.email,
    ch.chat_id,
    ch.timestamp,
    ch.conversation->>'messages' AS messages,
    ch.metadata->>'session_duration' AS session_duration,
    ch.metadata->>'user_satisfaction' AS user_satisfaction
FROM 
    users u
INNER JOIN 
    chat_history ch ON u.user_id = ch.user_id
ORDER BY 
    u.user_id, ch.timestamp;

SELECT 
    u.user_id,
    u.username,
    u.email,
    ch.chat_id,
    ch.timestamp,
    ch.conversation->>'messages' AS messages,
    ch.metadata->>'session_duration' AS session_duration,
    ch.metadata->>'user_satisfaction' AS user_satisfaction
FROM 
    users u
INNER JOIN 
    chat_history ch ON u.user_id = ch.user_id
WHERE 
    u.user_id = 1
ORDER BY 
    ch.timestamp;