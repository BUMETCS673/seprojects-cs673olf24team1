package com.bu.coursebuilderchatbotms.controller;

import com.bu.coursebuilderchatbotms.service.UserService;
import com.bu.coursebuilderchatbotms.domain.User;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/chatbot")
public class ChatbotController {
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    private final UserService userService;

    @Autowired
    public ChatbotController(WebClient webClient, ObjectMapper objectMapper, UserService userService) {
        this.webClient = webClient;
        this.objectMapper = objectMapper;
        this.userService = userService;
    }

    @PostMapping("/chat_conversation")
    public Mono<JsonNode> chatConversation(@RequestBody JsonNode request) {
        String username = request.get("user_id").asText();
        String message = request.get("message").asText();

        User user = userService.getUserByUsername(username);

        ObjectNode aiRequest = objectMapper.createObjectNode();
        aiRequest.put("user_id", user.getAuthId());
        aiRequest.put("student_name", user.getAuthId());
        aiRequest.put("message", message);
        List<String> courseTaken = convertStringToStringArr(user.getCourse_taken());
        aiRequest.set("course_taken", objectMapper.valueToTree(courseTaken));
        aiRequest.put("path_interest", user.getPathInterest());
        aiRequest.put("course_to_take", user.getCourseToTake());

        System.out.println(aiRequest);

        return webClient.post()
                .uri("/api/v1/chatbot")
                .bodyValue(aiRequest)
                .retrieve()
                .bodyToMono(JsonNode.class);
    }

    private List<String> convertStringToStringArr(String input) {
        if (input == null || input.isEmpty()) {
            return new ArrayList<>();
        }
        input = input.replaceAll("'", "").replaceAll("\\[", "").replaceAll("\\]", "");
        String[] elements = input.split(",");
        List<String> result = new ArrayList<>();
        for (String element : elements) {
            result.add(element.trim());
        }
        return result;
    }
}