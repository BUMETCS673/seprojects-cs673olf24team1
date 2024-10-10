package com.bu.coursebuilderchatbotms.service;

import com.bu.coursebuilderchatbotms.dao.SessionDAO;
import com.bu.coursebuilderchatbotms.domain.Session;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import java.util.List;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class SessionServiceTest {

    @Autowired
    private SessionService sessionService;

    @MockBean
    private SessionDAO sessionDAO;

    @MockBean
    private ObjectMapper objectMapper;

    @Test
    public void getSessionsByUserIdTest() throws Exception {
        Session session = new Session();
        when(sessionDAO.getSessionsByUserId(1)).thenReturn(List.of(session));
        when(objectMapper.readValue(anyString(), eq(Object.class))).thenReturn(new Object());
        when(objectMapper.writeValueAsString(any())).thenReturn("cleanedJson");

        List<Session> sessions = sessionService.getSessionsByUserId(1);
        assertFalse(sessions.isEmpty());
        assertEquals("cleanedJson", sessions.get(0).getConversation());
    }

    @Test
    public void addConversationTest() throws Exception {
        String json = "{\"message\":\"hello\"}";
        when(objectMapper.readValue(json, Object.class)).thenReturn(new Object());
        when(objectMapper.writeValueAsString(any())).thenReturn("cleanJson");

        sessionService.addConversation(1, json);
        verify(sessionDAO).addConversation(1, "cleanJson");
    }
}