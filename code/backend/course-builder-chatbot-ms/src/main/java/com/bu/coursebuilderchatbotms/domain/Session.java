package com.bu.coursebuilderchatbotms.domain;

import lombok.Data;

@Data
public class Session {
    private int sessionId;
    private int userId;
    private String createdAt;
    private String endChatTime;
    private String conversation;
}
