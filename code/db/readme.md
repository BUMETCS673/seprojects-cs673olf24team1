```markdown
# 🗄️ PostgreSQL Database Schema

This directory contains the SQL schema and queries for managing user and chat history data in a PostgreSQL database. The schema includes tables for storing user information and chat interactions, along with queries for data retrieval and analysis.

## 📋 Database Schema

### 1. **Users Table**

The `users` table stores user-related data, including credentials and preferences.

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    user_preferences JSONB
);
```

- **Columns**:
  - `user_id`: Auto-incrementing primary key.
  - `username`: Unique username for each user.
  - `email`: Unique email address.
  - `password_hash`: Hashed password for secure storage.
  - `created_at`: Timestamp of user creation (default: current timestamp).
  - `last_login`: Timestamp of the user's last login.
  - `user_preferences`: JSONB column for storing customizable user settings.

### 2. **Chat History Table**

The `chat_history` table stores individual user interactions and chat metadata.

```sql
CREATE TABLE chat_history (
    chat_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    conversation JSONB NOT NULL,
    metadata JSONB
);
```

- **Columns**:
  - `chat_id`: Auto-incrementing primary key for each chat session.
  - `user_id`: Foreign key linking to the `users` table.
  - `timestamp`: Timestamp of when the chat occurred (default: current timestamp).
  - `conversation`: JSONB column storing chat messages.
  - `metadata`: JSONB column for storing chat session metadata (e.g., session duration, user satisfaction).

### 3. **Indexes**

```sql
CREATE INDEX idx_chat_history_user_id ON chat_history(user_id);
```

- Indexes are created for optimizing queries on `user_id` in the `chat_history` table.

## 📊 Sample Queries

### 1. **Basic Select Queries**

Fetch all users and chat history:

```sql
SELECT * FROM users u;
SELECT * FROM chat_history ch;
```

### 2. **Insert Data**

Example of inserting data into `users` and `chat_history`:

```sql
INSERT INTO users (username, email, password_hash, user_preferences) VALUES
('john_doe', 'john.doe@example.com', 'hashed_password_1', '{"theme": "dark", "notifications": true}'),
('jane_smith', 'jane.smith@example.com', 'hashed_password_2', '{"theme": "light", "notifications": false}');
```

```sql
INSERT INTO chat_history (user_id, conversation, metadata) VALUES
(1, '{"messages": [{"role": "user", "content": "What courses are available for Computer Science?"}, {"role": "assistant", "content": "There are several courses available ..."}]}', '{"session_duration": 120, "user_satisfaction": 4}');
```

### 3. **Join and Data Retrieval Queries**

Fetch users along with their chat history:

```sql
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
```

Filter chat history for a specific user:

```sql
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
```

## 📦 Sample Data

The database includes sample users and chat history data to demonstrate how the application interacts with the database.

### Example Users:
- **john_doe**: A user with dark theme and notifications enabled.
- **jane_smith**: A user with light theme and notifications disabled.

### Example Chat History:
- Conversations involving course recommendations, prerequisites, and course scheduling for Computer Science.

---

Feel free to explore the schema and run the queries to understand how data is structured and retrieved!
```