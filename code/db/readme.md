```markdown
# 🗄️ PostgreSQL Database Schema

Within this directory, we have three different `.sql` files consisting of:
1. `depreciated_scripts.sql`: for our first draft db script from iteration 1.
2. `BUAN.sql`: the ideal structured relational database script for our finished product post-iteration 3.
3. `current_buandb.sql`: the final draft for our db script for our cs673 project.

We will explain the `BUAN.sql` file further in the SDD documentation and focus on the sql script file that we plan to use in this project.

## 📋 Database Schema

### 1. **Users Table**

The `users` table stores user-related data, including credentials and preferences.

```sql
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
```

- **Columns**:
  - `user_id`: Auto-incrementing primary key.
  - `auth_id`: String identifier of their Login Authentication.
  - `email`:Unique email address. 
  - `password_hash`: Hashed password for secure storage.
  - `f_name`: First name of user.
  - `l_name`: Last name of user.
  - `program_code`: String value of their program code.
  - `course_taken`: JSONB column for storing the courses taken [List of Integer]
  - `path_interest`: String value of their career path interest.
  - `course_to_take`: Integer value of course to take for the semester.

### 2. **Sessions Table**

The `sessions` table stores individual user interactions and chat metadata.

```sql
CREATE TABLE sessions (
    session_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Previous Click New chat timestamp
    end_chattime TIMESTAMP WITH TIME ZONE, -- Next Click New Chat timestamp
    conversation JSONB
);
```

- **Columns**:
  - `session_id`: Auto-incrementing primary key for each chat session.
  - `user_id`: Foreign key linking to the `users` table.
  - `created_at`: Timestamp of when the chat was created (default: current timestamp).
  - `end_chattime`: Timestamp of when user clicks `end chat`.
  - `conversation`: JSONB column storing chat messages and metadata(e.g., session duration, user satisfaction)

### 3. **Indexes**

- Indexes are created for optimizing queries on `user_id` in the `chat_history` table.

```sql

-- Indexes
-- Index for foreign key user_id in sessions table
CREATE INDEX idx_sessions_user_id ON sessions(user_id);

-- Indexes for USERS table (index frequently used variable)
CREATE INDEX idx_users_f_name ON users(f_name);
CREATE INDEX idx_users_program_code ON users(program_code);
CREATE INDEX idx_users_course_taken ON users(course_taken);
CREATE INDEX idx_users_course_to_take ON users(course_to_take);
CREATE INDEX idx_users_path_interest ON users(path_interest);

-- Indexes for sessions table (index frequently used variable)
CREATE INDEX idx_sessions_conversation ON sessions(conversation);
CREATE INDEX idx_sessions_created_at ON sessions(created_at);

```

## 📜 Stored Procedures
### Storedproc: Update the `user` table when a new user is created through the sign-up page
This procedure adds a new user to the `users` table.
```sql
CREATE OR REPLACE PROCEDURE add_user(
    p_auth_id VARCHAR,
    p_email VARCHAR,
    p_password_hash VARCHAR,
    p_f_name VARCHAR,
    p_l_name VARCHAR,
    p_program_code VARCHAR,
    p_course_taken JSONB,
    p_path_interest VARCHAR,
    p_course_to_take INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO users (auth_id, email, password_hash, f_name, l_name, program_code, course_taken, path_interest, course_to_take)
    VALUES (p_auth_id, p_email, p_password_hash, p_f_name, p_l_name, p_program_code, p_course_taken, p_path_interest, p_course_to_take);
END;
$$;

```

### Storedproc: Retrieve `auth_id` when the user wants to log in
This function retrieves the `auth_id` for a user based on their `email` and `password hash`, which can be used to verify the user's identity.
``` sql
CREATE OR REPLACE FUNCTION get_auth_id(p_email VARCHAR, p_password_hash VARCHAR)
RETURNS VARCHAR
LANGUAGE plpgsql
AS $$
DECLARE
    v_auth_id VARCHAR;
BEGIN
    SELECT auth_id INTO v_auth_id
    FROM users
    WHERE email = p_email AND password_hash = p_password_hash;
    
    RETURN v_auth_id;
END;
$$;
```

### Storedproc: Insert a new `session` when a new session is created
This procedure creates a new entry in the `sessions` table for user interactions.
```sql
CREATE OR REPLACE PROCEDURE add_session(
    p_user_id INT,
    p_end_chattime TIMESTAMP WITH TIME ZONE,
    p_conversation JSONB
)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO sessions (user_id, end_chattime, conversation)
    VALUES (p_user_id, p_end_chattime, p_conversation);
END;
$$;

```

### Storedproc: Update the `session` table when the save chat button is pressed, adding a new JSONB file to the conversation field
This procedure appends new chat messages to an existing `conversation` in the `sessions` table.
```sql
CREATE OR REPLACE PROCEDURE update_session_conversation(
    p_session_id INT,
    p_new_conversation JSONB
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE sessions
    SET conversation = conversation || p_new_conversation
    WHERE session_id = p_session_id;
END;
$$;

```
### Storedproc: Update the `session` table when the new chat button is pressed, adding the `end time` timestamp to the field
This procedure updates the `end time` of a `session` when a new chat is started.
```sql
CREATE OR REPLACE PROCEDURE update_session_end_time(
    p_session_id INT,
    p_end_chattime TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE sessions
    SET end_chattime = p_end_chattime
    WHERE session_id = p_session_id;
END;
$$;

```
### Storedproc: Retrieve `session information` using `auth ID` for the Python AI service
This function retrieves session information, including the `session ID`, `end chat time`, and `conversation history` for a specified user.
```sql
CREATE OR REPLACE FUNCTION get_session_info(p_auth_id VARCHAR)
RETURNS TABLE(session_id INT, end_chattime TIMESTAMP WITH TIME ZONE, conversation JSONB)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT s.session_id, s.end_chattime, s.conversation
    FROM sessions s
    INNER JOIN users u ON s.user_id = u.user_id
    WHERE u.auth_id = p_auth_id;
END;
$$;


```

### Example of Usage
Create new `User`: To add a new user to the users table, call the add_user procedure with the required parameters.
```sql
CALL add_user('auth_005', 'user5@example.com', 'hashed_password5', 'Eve', 'Adams', 'CS105', '["526, 622"]', 'Cybersecurity', 1);
```
Description: This command creates a new user named Eve Adams with their authentication ID, email, hashed password, program code, and other details.


Log in and retrieve the `auth_id`: To authenticate a user and get their auth_id, use the get_auth_id function.
```sql
SELECT get_auth_id('user5@example.com', 'hashed_password5');
```
Description: This command checks the credentials of the user and returns their auth_id if the email and password hash match.

Add a new `session`: To create a new session when a user interacts with the system, call the add_session procedure.
```sql
CALL add_session(1, '2024-10-01T12:00:00Z', '[{"user": "Hello", "chatbot": "Hi!"}]');
```
Description: This command creates a new session for the user with ID 1, setting the end chat time and initial conversation data.

Update the `conversation` in a `session`: When a user saves their chat, append the new messages to the existing conversation.
```sql
CALL update_session_conversation(1, '[{"user": "New message", "chatbot": "Response"}]');
```
Description: This command updates the conversation in the session with ID 1 by adding a new JSON object with the user's message and chatbot response.

Update the `end time` of a session: To mark the end time of a chat session, use the update_session_end_time procedure.
```sql
CALL update_session_end_time(1, '2024-10-01T12:30:00Z');
```
Description: This command sets the end chat time for the session with ID 1 to the specified timestamp.

Retrieve `session info` using `auth_id` for using the Python AI service: To get all session details for a specific user, use the get_session_info function.
```sql
SELECT * FROM get_session_info('auth_001');
```
This command retrieves all session records associated with the user ID 1, including the session ID, end chat time, and conversation data.





## 📊 Sample Queries

### 1. **Basic Select Queries**

Fetch all users and sessions:

```sql
SELECT * FROM users;
SELECT * FROM sessions;
```

### 2. **Insert Data**

Example of inserting data into `users` and `chat_history`:

```sql
INSERT INTO users (auth_id, email, password_hash, f_name, l_name, program_code, course_taken, path_interest, course_to_take) VALUES
('john_doe1203', 'john.doe@example.com', 'hashed_password_1', 'John', 'Doe', 'mssd', '{[521, 526, 622]}', 'ai/ml', 3),
('jane_smith2306', 'jane.smith@example.com', 'hashed_password_2', 'Jane', 'Smith', 'mssd', '{[521, 526, 673, 677, 763]}', 'app development', 2);
```

```sql
INSERT INTO chat_history (user_id, created_at, end_chattime, conversation) VALUES
(1, `CURRENT_TIMESTAMP`, '', '{"messages": [{"role": "user", "content": "What courses are available for Computer Science?"}, {"role": "assistant", "content": "There are several courses available ..."}], "session_duration": 120, "user_satisfaction": 4}');
```

### 3. **Join and Data Retrieval Queries**

Fetch users along with their chat history:

```sql
SELECT 
    u.user_id,
    u.f_name,
    u.l_name,
    u.email,
    s.session_id,
    s.created_at,
    s.end_chattime,
    s.conversation->>'messages' AS messages
FROM 
    users u
INNER JOIN 
    sessions s ON u.user_id = s.user_id
ORDER BY 
    u.user_id, s.created_at;

```

Filter sessions for a specific user:

```sql
SELECT 
    u.user_id,
    u.f_name,
    u.l_name,
    u.email,
    s.session_id,
    s.created_at,
    s.end_chattime,
    s.conversation->>'messages' AS messages
FROM 
    users u
INNER JOIN 
    sessions s ON u.user_id = s.user_id
WHERE 
    u.user_id = 1 -- Replace with the desired user_id
ORDER BY 
    s.created_at;

```

## 📦 Sample Data

The database includes sample users and sessions data to demonstrate how the application interacts with the database.

### Example Users:
John Doe: A user enrolled in the MS of Software Development program with program_code 'mssd'.
Jane Smith: A user enrolled in the MS of Software Development program with program_code 'mssd'.

### Example Sessions:
- Conversations involving course recommendations, prerequisites, and course scheduling for MS of Software Development.

---

Feel free to explore the schema and run the queries to understand how data is structured and retrieved!
```
