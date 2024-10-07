package com.bu.coursebuilderchatbotms.controller;

import com.bu.coursebuilderchatbotms.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import reactor.core.publisher.Mono;

import static org.mockito.BDDMockito.given;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import org.springframework.web.reactive.function.client.WebClient;

@WebMvcTest(ChatbotController.class) // Use this for MVC testing
public class ChatbotControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private WebClient webClient;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testChatConversation() throws Exception {
        String requestJson = "{\"user_id\":\"user123\", \"message\":\"Hello\"}";
        String responseJson = "{\"response\":\"Hi there!\"}";

        given(webClient.post()
                .uri("/api/v1/chatbot")
                .bodyValue(any())
                .retrieve()
                .bodyToMono(String.class))
                .willReturn(Mono.just(responseJson));

        mockMvc.perform(post("/api/v1/chatbot/chat_conversation")
                        .contentType("application/json")
                        .content(requestJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response").value("Hi there!"));
    }
}