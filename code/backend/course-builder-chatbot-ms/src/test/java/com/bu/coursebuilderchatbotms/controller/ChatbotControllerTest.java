package com.bu.coursebuilderchatbotms.controller;

import com.bu.coursebuilderchatbotms.domain.User;
import com.bu.coursebuilderchatbotms.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ChatbotControllerTest {

    @InjectMocks
    private ChatbotController chatbotController;

    @Mock
    private WebClient webClient;

    @Mock
    private UserService userService;

    @Mock
    private ObjectMapper objectMapper;

    private WebClient.RequestBodyUriSpec requestBodyUriSpecMock;
    private WebClient.RequestBodySpec requestBodySpecMock;
    private WebClient.RequestHeadersSpec requestHeadersSpecMock;
    private WebClient.ResponseSpec responseSpecMock;

    private ObjectMapper defaultObjectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        defaultObjectMapper = new ObjectMapper();

        requestBodyUriSpecMock = mock(WebClient.RequestBodyUriSpec.class);
        requestBodySpecMock = mock(WebClient.RequestBodySpec.class);
        requestHeadersSpecMock = mock(WebClient.RequestHeadersSpec.class);
        responseSpecMock = mock(WebClient.ResponseSpec.class);

        chatbotController = new ChatbotController(webClient, objectMapper, userService);

        // Mock ObjectMapper.createObjectNode() to return a real ObjectNode
        when(objectMapper.createObjectNode()).thenAnswer(invocation -> defaultObjectMapper.createObjectNode());
    }

    @Test
    void testChatConversation_Success() throws Exception {
        // Arrange
        String username = "bu1234";
        String message = "Can I take that class?";

        User user = new User();
        user.setAuthId(username);
        user.setCourse_taken("CS101,CS102");
        user.setPathInterest("AI");
        user.setCourseToTake(1);

        ObjectNode requestJson = defaultObjectMapper.createObjectNode();
        requestJson.put("user_id", username);
        requestJson.put("message", message);

        ObjectNode aiRequest = defaultObjectMapper.createObjectNode();
        aiRequest.put("user_id", username);
        aiRequest.put("student_name", username);
        aiRequest.put("message", message);

        // Mock UserService
        when(userService.getUserByUsername(username)).thenReturn(user);

        // Mock WebClient
        when(webClient.post()).thenReturn(requestBodyUriSpecMock);
        when(requestBodyUriSpecMock.uri("/api/v1/chatbot")).thenReturn(requestBodySpecMock);
        when(requestBodySpecMock.bodyValue(any())).thenReturn(requestHeadersSpecMock);
        when(requestHeadersSpecMock.retrieve()).thenReturn(responseSpecMock);

        ObjectNode responseJson = defaultObjectMapper.createObjectNode();
        responseJson.put("response", "Hey there! It looks like you've already completed CS521...");

        when(responseSpecMock.bodyToMono(JsonNode.class)).thenReturn(Mono.just(responseJson));

        // Act
        Mono<JsonNode> result = chatbotController.chatConversation(requestJson);
        JsonNode jsonResponse = result.block();

        // Assert
        assertNotNull(jsonResponse);
        assertEquals("Hey there! It looks like you've already completed CS521...", jsonResponse.get("response").asText());

        verify(userService).getUserByUsername(username);
        verify(webClient).post();
        verify(requestBodyUriSpecMock).uri("/api/v1/chatbot");
        verify(requestBodySpecMock).bodyValue(any());
        verify(requestHeadersSpecMock).retrieve();
        verify(responseSpecMock).bodyToMono(JsonNode.class);
    }


    @Test
    void testChatConversation_UserNotFound() throws Exception {
        // Arrange
        String username = "unknown_user";
        String message = "Can I take that class?";

        ObjectNode requestJson = defaultObjectMapper.createObjectNode();
        requestJson.put("user_id", username);
        requestJson.put("message", message);

        // Mock UserService to return null (user not found)
        when(userService.getUserByUsername(username)).thenReturn(null);

        // Act & Assert
        Mono<JsonNode> result = chatbotController.chatConversation(requestJson);
        assertThrows(NullPointerException.class, result::block);

        verify(userService).getUserByUsername(username);
        verifyNoInteractions(webClient);  // WebClient should not be called if user not found
    }

}