package com.bu.coursebuilderchatbotms.domain;

import lombok.Data;

@Data
public class ChatHistory {
    private int chatId;
    private int userId;
    private String timestamp;
    private String conversation;
    private String metadata;
}