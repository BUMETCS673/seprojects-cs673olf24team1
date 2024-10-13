package com.bu.coursebuilderchatbotms.dao;

import com.bu.coursebuilderchatbotms.domain.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.h2.jdbcx.JdbcDataSource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.sql2o.Sql2o;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class UserDAOTest {

    private UserDAO userDAO;
    private Sql2o sql2o;

    @BeforeEach
    void setUp() {
        // Set up H2 in-memory database
        JdbcDataSource dataSource = new JdbcDataSource();
        dataSource.setURL("jdbc:h2:mem:test;MODE=PostgreSQL;DB_CLOSE_DELAY=-1"); // In-memory database with PostgreSQL mode
        dataSource.setUser("sa");
        dataSource.setPassword("");

        sql2o = new Sql2o(dataSource);
        userDAO = new UserDAO(sql2o, new ObjectMapper());

        // Drop the 'users' table if it exists
        String dropTableQuery = "DROP TABLE IF EXISTS users";

        // Create the 'users' table WITHOUT the created_at and last_login columns for the test
        String createTableQuery = "CREATE TABLE users (" +
                "user_id SERIAL PRIMARY KEY, " +
                "auth_id VARCHAR(50), " +
                "email VARCHAR(100), " +
                "password_hash VARCHAR(100), " +
                "f_name VARCHAR(50), " +
                "l_name VARCHAR(50), " +
                "program_code VARCHAR(10), " +
                "course_taken JSON, " +  // Using JSON instead of JSONB for H2 compatibility
                "path_interest VARCHAR(100), " +
                "course_to_take INT" +  // No created_at and last_login in the test table
                ")";

        try (org.sql2o.Connection con = sql2o.open()) {
            con.createQuery(dropTableQuery).executeUpdate();  // Drop the table if it exists
            con.createQuery(createTableQuery).executeUpdate();  // Create the table
        }
    }

    @Test
    void testCreateUser() {
        // Arrange
        User user = new User();
        user.setAuthId("auth123");
        user.setEmail("test@example.com");
        user.setPasswordHash("hashedPassword");
        user.setFName("John");
        user.setLName("Doe");
        user.setProgramCode("CS101");
        user.setCourse_taken("['CS101', 'CS102']");
        user.setPathInterest("AI");
        user.setCourseToTake(2);

        // Act
        userDAO.createUser(user);

        // Assert
        try (org.sql2o.Connection con = sql2o.open()) {
            User savedUser = con.createQuery("SELECT * FROM users WHERE auth_id = :authId")
                    .addParameter("authId", "auth123")
                    .addColumnMapping("user_id", "userId")        // Map user_id to userId
                    .addColumnMapping("auth_id", "authId")        // Map auth_id to authId
                    .addColumnMapping("password_hash", "passwordHash")  // Map password_hash to passwordHash
                    .addColumnMapping("f_name", "fName")          // Map f_name to fName
                    .addColumnMapping("l_name", "lName")          // Map l_name to lName
                    .addColumnMapping("program_code", "programCode")  // Map program_code to programCode
                    .addColumnMapping("course_taken", "course_taken")  // Map course_taken to course_taken
                    .addColumnMapping("path_interest", "pathInterest")  // Map path_interest to pathInterest
                    .addColumnMapping("course_to_take", "courseToTake")  // Map course_to_take to courseToTake
                    .executeAndFetchFirst(User.class);

            assertNotNull(savedUser);
            assertEquals("auth123", savedUser.getAuthId());
            assertEquals("test@example.com", savedUser.getEmail());
            assertEquals("John", savedUser.getFName());
        }
    }

    @Test
    void testGetUserById() {
        // Arrange
        User user = new User();
        user.setAuthId("auth123");
        user.setEmail("test@example.com");
        user.setPasswordHash("hashedPassword");
        user.setFName("John");
        user.setLName("Doe");
        user.setProgramCode("CS101");
        user.setCourse_taken("['CS101', 'CS102']");
        user.setPathInterest("AI");
        user.setCourseToTake(2);

        // Insert user into DB
        userDAO.createUser(user);

        // Get the user by ID
        try (org.sql2o.Connection con = sql2o.open()) {
            int userId = con.createQuery("SELECT user_id FROM users WHERE auth_id = :authId")
                    .addParameter("authId", "auth123")
                    .executeScalar(Integer.class);

            // Act
            User fetchedUser = userDAO.getUserById(userId);

            // Assert
            assertNotNull(fetchedUser);
            assertEquals("auth123", fetchedUser.getAuthId());
            assertEquals("test@example.com", fetchedUser.getEmail());
            assertEquals("John", fetchedUser.getFName());
        }
    }

    @Test
    void testGetUserByUsername() {
        // Arrange
        User user = new User();
        user.setAuthId("auth123");
        user.setEmail("test@example.com");
        user.setPasswordHash("hashedPassword");
        user.setFName("John");
        user.setLName("Doe");
        user.setProgramCode("CS101");
        user.setCourse_taken("['CS101', 'CS102']");
        user.setPathInterest("AI");
        user.setCourseToTake(2);

        // Insert user into DB
        userDAO.createUser(user);

        // Act
        User fetchedUser = userDAO.getUserByUsername("auth123");

        // Assert
        assertNotNull(fetchedUser);
        assertEquals("auth123", fetchedUser.getAuthId());
        assertEquals("test@example.com", fetchedUser.getEmail());
        assertEquals("John", fetchedUser.getFName());
    }
}