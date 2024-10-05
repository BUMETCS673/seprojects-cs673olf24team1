package com.bu.coursebuilderchatbotms.service;

import com.bu.coursebuilderchatbotms.dao.SessionDAO;
import com.bu.coursebuilderchatbotms.domain.Session;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SessionService {

    private final SessionDAO sessionDAO;
    private static final Logger logger = LoggerFactory.getLogger(SessionService.class);
    private final ObjectMapper objectMapper;

    @Autowired
    public SessionService(SessionDAO sessionDAO, ObjectMapper objectMapper) {
        this.sessionDAO = sessionDAO;
        this.objectMapper = objectMapper;
    }

    public List<Session> getSessionsByUserId(int userId) {
        List<Session> sessions = sessionDAO.getSessionsByUserId(userId);
        return cleanConversations(sessions);
    }

    @Transactional
    public void addConversation(int userId, String conversation) {
        try {
            Object jsonObject = objectMapper.readValue(conversation, Object.class);
            String cleanedConversation = objectMapper.writeValueAsString(jsonObject);
            sessionDAO.addConversation(userId, cleanedConversation);
        } catch (JsonProcessingException e) {
            logger.error("Error processing conversation JSON: {}", e.getMessage());
            throw new IllegalArgumentException("Invalid conversation JSON", e);
        }
    }

    private List<Session> cleanConversations(List<Session> sessions) {
        for (Session session : sessions) {
            try {
                logger.debug("Raw conversation before cleaning: {}", session.getConversation());
                Object jsonObject = objectMapper.readValue(session.getConversation(), Object.class);
                String cleanedConversation = objectMapper.writeValueAsString(jsonObject);
                session.setConversation(cleanedConversation);
                logger.debug("Cleaned conversation: {}", cleanedConversation);
            } catch (JsonProcessingException e) {
                logger.error("Error processing JSON for session {}: {}", session.getSessionId(), e.getMessage());
            }
        }
        return sessions;
    }
}