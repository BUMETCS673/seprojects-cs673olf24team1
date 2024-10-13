package com.bu.coursebuilderchatbotms.dao;

import com.bu.coursebuilderchatbotms.domain.Session;
import org.h2.jdbcx.JdbcDataSource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.sql2o.Sql2o;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class SessionDAOTest {

    private SessionDAO sessionDAO;
    private Sql2o sql2o;

    @BeforeEach
    void setUp() {
        // Set up H2 in-memory database with PostgreSQL compatibility mode
        JdbcDataSource dataSource = new JdbcDataSource();
        dataSource.setURL("jdbc:h2:mem:test;MODE=PostgreSQL;DB_CLOSE_DELAY=-1"); // PostgreSQL mode
        dataSource.setUser("sa");
        dataSource.setPassword("");

        sql2o = new Sql2o(dataSource);
        sessionDAO = new SessionDAO(sql2o);

        // Drop and create the 'sessions' table for testing
        String dropTableQuery = "DROP TABLE IF EXISTS sessions";
        String createTableQuery = "CREATE TABLE sessions (" +
                "session_id SERIAL PRIMARY KEY, " +
                "user_id INT, " +
                "created_at TIMESTAMP, " +
                "end_chattime TIMESTAMP, " +
                "conversation TEXT" +
                ")";

        try (org.sql2o.Connection con = sql2o.open()) {
            con.createQuery(dropTableQuery).executeUpdate();
            con.createQuery(createTableQuery).executeUpdate();
        }
    }

    @Test
    void testAddConversation() {
        // Arrange
        int userId = 1;
        String expectedConversation = "{\"message\":\"Hello, how are you?\"}";

        // Act
        sessionDAO.addConversation(userId, expectedConversation);

        // Assert
        try (org.sql2o.Connection con = sql2o.open()) {
            String query = "SELECT * FROM sessions WHERE user_id = :userId";
            Session savedSession = con.createQuery(query)
                    .addParameter("userId", userId)
                    .addColumnMapping("session_id", "sessionId")
                    .addColumnMapping("user_id", "userId")
                    .addColumnMapping("created_at", "createdAt")
                    .addColumnMapping("end_chattime", "endChatTime")
                    .addColumnMapping("conversation", "conversation")
                    .executeAndFetchFirst(Session.class);

            assertNotNull(savedSession);
            assertEquals(userId, savedSession.getUserId());

            // Step 1: Retrieve conversation as String
            String conversationFromDB = savedSession.getConversation();

            // Step 2: Remove extra quotes if needed
            if (conversationFromDB.startsWith("\"") && conversationFromDB.endsWith("\"")) {
                conversationFromDB = conversationFromDB.substring(1, conversationFromDB.length() - 1).replace("\\\"", "\"");
            }

            // Step 3: Compare the actual and expected conversations
            assertEquals(expectedConversation, conversationFromDB);
        }
    }

    @Test
    void testGetSessionsByUserId() {
        // Arrange
        int userId = 1;
        String expectedConversation = "{\"message\":\"Hello, how are you?\"}";
        sessionDAO.addConversation(userId, expectedConversation);

        // Act
        List<Session> sessions = sessionDAO.getSessionsByUserId(userId);

        // Assert
        assertNotNull(sessions);
        assertFalse(sessions.isEmpty());
        Session session = sessions.get(0);
        assertEquals(userId, session.getUserId());

        // Step 4: Retrieve conversation and compare as String
        String conversationFromDB = session.getConversation();

        // Step 5: Remove extra quotes if needed
        if (conversationFromDB.startsWith("\"") && conversationFromDB.endsWith("\"")) {
            conversationFromDB = conversationFromDB.substring(1, conversationFromDB.length() - 1).replace("\\\"", "\"");
        }

        assertEquals(expectedConversation, conversationFromDB);  // Compare the expected conversation with the one retrieved from the DB
    }
}