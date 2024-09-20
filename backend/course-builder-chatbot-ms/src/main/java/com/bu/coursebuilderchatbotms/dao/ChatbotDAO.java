package com.bu.coursebuilderchatbotms.dao;

import com.bu.coursebuilderchatbotms.domain.ChatHistory;
import com.bu.coursebuilderchatbotms.domain.User;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public class ChatbotDAO {

    private final Sql2o sql2o;

    public ChatbotDAO(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    public List<ChatHistory> getChatHistoryForUser(int userId) {
        String sql = "SELECT * FROM chat_history WHERE user_id = :userId ORDER BY timestamp";
        try (Connection con = sql2o.open()) {
            return con.createQuery(sql)
                    .addParameter("userId", userId)
                    .addColumnMapping("chat_id", "chatId")
                    .addColumnMapping("user_id", "userId")
                    .executeAndFetch(ChatHistory.class);
        }
    }

    public void insertChatHistory(ChatHistory chatHistory) {
        String sql = "INSERT INTO chat_history (user_id, conversation, metadata) VALUES (:userId, :conversation, :metadata)";
        try (Connection con = sql2o.open()) {
            con.createQuery(sql)
                    .addParameter("userId", chatHistory.getUserId())
                    .addParameter("conversation", chatHistory.getConversation())
                    .addParameter("metadata", chatHistory.getMetadata())
                    .executeUpdate();
        }
    }
}