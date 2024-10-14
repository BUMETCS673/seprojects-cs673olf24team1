package com.bu.coursebuilderchatbotms.controller;

import com.bu.coursebuilderchatbotms.controller.SessionsController;
import com.bu.coursebuilderchatbotms.domain.Session;
import com.bu.coursebuilderchatbotms.dto.ConversationDTO;
import com.bu.coursebuilderchatbotms.service.SessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class SessionsControllerTest {

    @InjectMocks
    private SessionsController sessionsController;

    @Mock
    private SessionService sessionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetSessionsByUserId() {
        int userId = 1;
        List<Session> mockSessions = Arrays.asList(new Session(), new Session());
        when(sessionService.getSessionsByUserId(userId)).thenReturn(mockSessions);

        ResponseEntity<List<Session>> response = sessionsController.getSessionsByUserId(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockSessions, response.getBody());
        verify(sessionService).getSessionsByUserId(userId);
    }

    @Test
    void testAddConversation() {
        int userId = 1;
        ConversationDTO conversationDTO = new ConversationDTO();
        conversationDTO.setConversation("Test conversation");

        ResponseEntity<Void> response = sessionsController.addConversation(userId, conversationDTO);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(sessionService).addConversation(userId, "Test conversation");
    }
}