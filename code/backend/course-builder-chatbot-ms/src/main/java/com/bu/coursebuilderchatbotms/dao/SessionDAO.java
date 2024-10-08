package com.bu.coursebuilderchatbotms.dao;

import com.bu.coursebuilderchatbotms.domain.Session;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SessionDAO {

    private final Sql2o sql2o;

    public SessionDAO(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    public List<Session> getSessionsByUserId(int userId) {
        String sql = "SELECT * FROM sessions WHERE user_id = :userId";
        try (Connection conn = sql2o.open()) {
            return conn.createQuery(sql)
                    .addParameter("userId", userId)
                    .addColumnMapping("session_id", "sessionId")
                    .addColumnMapping("user_id", "userId")
                    .addColumnMapping("created_at", "createdAt")
                    .addColumnMapping("end_chattime", "endChatTime")
                    .addColumnMapping("conversation", "conversation")
                    .executeAndFetch(Session.class);
        }
    }

    public void addConversation(int userId, String conversation) {
        String sql = "INSERT INTO sessions (user_id, conversation) VALUES (:userId, :conversation::jsonb)";
        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql)
                    .addParameter("userId", userId)
                    .addParameter("conversation", conversation)
                    .executeUpdate();
        }
    }
}