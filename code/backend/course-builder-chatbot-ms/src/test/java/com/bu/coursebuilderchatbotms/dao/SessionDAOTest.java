package com.bu.coursebuilderchatbotms.dao;

import com.bu.coursebuilderchatbotms.domain.Session;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class SessionDAOTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private SessionDAO sessionDAO;

    @Test
    public void testGetSessionsByUserId() {
        // Setup data
        Session session = new Session();
        session.setUserId(1);
        session.setConversation("Test conversation");
        entityManager.persist(session);
        entityManager.flush();

        // Test getSessionByUserId
        List<Session> sessions = sessionDAO.getSessionsByUserId(1);
        assertThat(sessions).hasSize(1);
        assertThat(sessions.get(0).getConversation()).isEqualTo("Test conversation");
    }

    @Test
    public void testAddConversation() {
        // Initially empty
        assertThat(sessionDAO.getSessionsByUserId(1)).isEmpty();

        // Add a session
        sessionDAO.addConversation(1, "{\"message\":\"hello\"}");

        // Verify the addition
        List<Session> sessions = sessionDAO.getSessionsByUserId(1);
        assertThat(sessions).isNotEmpty();
        assertThat(sessions.get(0).getConversation()).contains("hello");
    }
}