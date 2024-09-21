package com.bu.coursebuilderchatbotms.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/chatbot")
public class ChatbotController {

    private final String FLASK_API_URL = "http://localhost:9000";

    private final WebClient webClient;

    private final ObjectMapper objectMapper;

    private final ResourceLoader resourceLoader;

    public ChatbotController(WebClient.Builder webClientBuilder, ObjectMapper objectMapper, ResourceLoader resourceLoader) {
        this.webClient = webClientBuilder.baseUrl(FLASK_API_URL).build();
        this.objectMapper = objectMapper;
        this.resourceLoader = resourceLoader;
    }

    /*
    Below API is how we are going to make an external API call (e.g. Poom's bot)
     */
    @GetMapping("/example")
    public Mono<String> getPosts() {
        return webClient.get()
                .uri("/posts")
                .retrieve()
                .bodyToMono(String.class)
                .map(this::processResponse);
    }

    @PostMapping("/chat")
    public String getChatbotResponse(@RequestBody String userInput) throws IOException {
        Resource resource = resourceLoader.getResource("classpath:chatbot-responses.json");
        JsonNode rootNode = objectMapper.readTree(resource.getInputStream());
        JsonNode conversations = rootNode.get("conversations");

        for (JsonNode conversation : conversations) {
            if (conversation.get("input").asText().equalsIgnoreCase(userInput.trim())) {
                return conversation.get("response").asText();
            }
        }

        return "I'm sorry, I don't have information about that specific topic. Can you please ask about one of our courses?";
    }

    private String processResponse(String response) {
        try {
            return "Processed response: " + response;
        } catch (Exception e) {
            return "Error processing response: " + e.getMessage();
        }
    }
}
