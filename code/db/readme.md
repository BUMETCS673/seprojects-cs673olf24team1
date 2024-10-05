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

Filter chat history for a specific user:

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

### Example Chat History:
- Conversations involving course recommendations, prerequisites, and course scheduling for Computer Science.

---

Feel free to explore the schema and run the queries to understand how data is structured and retrieved!
```
