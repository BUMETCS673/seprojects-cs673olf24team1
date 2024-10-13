package com.bu.coursebuilderchatbotms.service;

import com.bu.coursebuilderchatbotms.dao.SessionDAO;
import com.bu.coursebuilderchatbotms.domain.Session;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SessionServiceTest {

    @InjectMocks
    private SessionService sessionService;

    @Mock
    private SessionDAO sessionDAO;

    @Mock
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getSessionsByUserId_Success() throws JsonProcessingException {
        int userId = 1;
        Session session1 = new Session();
        session1.setSessionId(1);
        session1.setConversation("{\"message\":\"Hello\"}");
        Session session2 = new Session();
        session2.setSessionId(2);
        session2.setConversation("{\"message\":\"World\"}");

        when(sessionDAO.getSessionsByUserId(userId)).thenReturn(Arrays.asList(session1, session2));
        when(objectMapper.readValue(anyString(), eq(Object.class))).thenReturn(new Object());
        when(objectMapper.writeValueAsString(any())).thenReturn("{\"cleanedMessage\":\"Test\"}");

        List<Session> result = sessionService.getSessionsByUserId(userId);

        assertEquals(2, result.size());
        assertEquals("{\"cleanedMessage\":\"Test\"}", result.get(0).getConversation());
        assertEquals("{\"cleanedMessage\":\"Test\"}", result.get(1).getConversation());
        verify(sessionDAO).getSessionsByUserId(userId);
    }

    @Test
    void addConversation_Success() throws JsonProcessingException {
        int userId = 1;
        String conversation = "{\"message\":\"Hello\"}";

        when(objectMapper.readValue(conversation, Object.class)).thenReturn(new Object());
        when(objectMapper.writeValueAsString(any())).thenReturn("{\"cleanedMessage\":\"Hello\"}");

        sessionService.addConversation(userId, conversation);

        verify(sessionDAO).addConversation(userId, "{\"cleanedMessage\":\"Hello\"}");
    }

    @Test
    void addConversation_InvalidJson() throws JsonProcessingException {
        int userId = 1;
        String invalidConversation = "invalid json";

        when(objectMapper.readValue(invalidConversation, Object.class)).thenThrow(new JsonProcessingException("Invalid JSON") {});

        assertThrows(IllegalArgumentException.class, () -> sessionService.addConversation(userId, invalidConversation));
    }
}