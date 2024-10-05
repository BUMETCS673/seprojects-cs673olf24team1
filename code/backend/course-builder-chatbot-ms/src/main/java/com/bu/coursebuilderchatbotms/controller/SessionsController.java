package com.bu.coursebuilderchatbotms.controller;

import com.bu.coursebuilderchatbotms.domain.Session;
import com.bu.coursebuilderchatbotms.dto.ConversationDTO;
import com.bu.coursebuilderchatbotms.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sessions")
public class SessionsController {

    private final SessionService sessionService;

    @Autowired
    public SessionsController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Session>> getSessionsByUserId(@PathVariable int userId) {
        List<Session> sessions = sessionService.getSessionsByUserId(userId);
        return ResponseEntity.ok(sessions);
    }

    @PostMapping("/user/{userId}/conversation")
    public ResponseEntity<Void> addConversation(@PathVariable int userId, @RequestBody ConversationDTO conversationDTO) {
        sessionService.addConversation(userId, conversationDTO.getConversation());
        return ResponseEntity.ok().build();
    }
}