package com.bu.coursebuilderchatbotms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

@RestController
public class CourseBuilderChatbotController {

    private final String FLASK_API_URL = "http://localhost:9080";
    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public CourseBuilderChatbotController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(FLASK_API_URL).build();
        this.objectMapper = new ObjectMapper();
    }

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello, World!";
    }

    @GetMapping("/posts")
    public Mono<String> getPosts() {
        return webClient.get()
                .uri("/posts")
                .retrieve()
                .bodyToMono(String.class)
                .map(this::processResponse);
    }

    private String processResponse(String response) {
        try {
            JsonNode jsonNode = objectMapper.readTree(response);
            if (jsonNode.isArray()) {
                ArrayNode arrayNode = (ArrayNode) jsonNode;
                for (JsonNode node : arrayNode) {
                    ((com.fasterxml.jackson.databind.node.ObjectNode) node).put("processed", true);
                }
            }
            return objectMapper.writeValueAsString(jsonNode);
        } catch (Exception e) {
            return "Error processing response: " + e.getMessage();
        }
    }
}