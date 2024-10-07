package com.bu.coursebuilderchatbotms.controller;

import com.bu.coursebuilderchatbotms.domain.Session; // Ensure this path is correct
import com.bu.coursebuilderchatbotms.service.SessionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SessionsController.class)
public class SessionsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SessionService sessionService;

    @Test
    public void testGetSessionsByUserId() throws Exception {
        given(sessionService.getSessionsByUserId(1)).willReturn(Arrays.asList(new Session()));

        mockMvc.perform(get("/api/v1/sessions/user/1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }
}