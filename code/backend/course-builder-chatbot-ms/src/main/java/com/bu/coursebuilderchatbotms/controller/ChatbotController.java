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

    private final String FAST_API = "http://localhost:9080";
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    private final UserService userService;

    @Autowired
    public ChatbotController(WebClient.Builder webClientBuilder, ObjectMapper objectMapper, UserService userService) {
        this.webClient = webClientBuilder.baseUrl(FAST_API).build();
        this.objectMapper = objectMapper;
        this.userService = userService;
    }

    @PostMapping("/chat_conversation")
    public Mono<JsonNode> chatConversation(@RequestBody JsonNode request) {
        String username = request.get("user_id").asText();
        User user = userService.getUserByUsername(username);

        ObjectNode flaskRequest = objectMapper.createObjectNode();
        flaskRequest.put("user_id", user.getUsername());
        flaskRequest.put("student_name", user.getUsername());
        flaskRequest.put("message", request.get("message").asText());
        List<String> courseTaken = convertStringToStringArr(user.getCourse_taken());
        flaskRequest.set("course_taken", objectMapper.valueToTree(courseTaken));
        flaskRequest.put("path_interest", user.getPath_interest());
        flaskRequest.put("course_to_take", user.getCourse_to_take());

        System.out.println(flaskRequest);
        return webClient.post()
                .uri("/api/v1/chatbot")
                .bodyValue(flaskRequest)
                .retrieve()
                .bodyToMono(JsonNode.class);
    }

    private List<String> convertStringToStringArr(String input) {
        if (input == null || input.isEmpty()) {
            return new ArrayList<>();
        }

        // Remove the single quotes and square brackets
        input = input.replaceAll("'", "").replaceAll("\\[", "").replaceAll("\\]", "");

        // Split the string by comma and trim each element
        String[] elements = input.split(",");
        List<String> result = new ArrayList<>();
        for (String element : elements) {
            result.add(element.trim());
        }

        return result;
    }
}