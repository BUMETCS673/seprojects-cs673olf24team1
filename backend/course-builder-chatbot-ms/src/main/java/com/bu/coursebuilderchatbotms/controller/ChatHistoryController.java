package com.bu.coursebuilderchatbotms.controller;

import com.bu.coursebuilderchatbotms.dao.ChatbotDAO;
import com.bu.coursebuilderchatbotms.domain.ChatHistory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chat-history")
public class ChatHistoryController {

    private final ChatbotDAO chatbotDAO;

    public ChatHistoryController(ChatbotDAO chatbotDAO) {
        this.chatbotDAO = chatbotDAO;
    }

    @GetMapping("/users/{userId}/chat-history")
    public List<ChatHistory> getChatHistoryForUser(@PathVariable int userId) {
        return chatbotDAO.getChatHistoryForUser(userId);
    }

    @PostMapping("/new-chat-history")
    public void insertChatHistory(@RequestBody ChatHistory chatHistory) {
        chatbotDAO.insertChatHistory(chatHistory);
    }
}
