package com.bu.coursebuilderchatbotms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseBuilderChatbotController {

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello, World!";
    }

}