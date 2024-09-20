package com.bu.coursebuilderchatbotms.dao;

import com.bu.coursebuilderchatbotms.domain.User;
import org.springframework.stereotype.Repository;
import org.sql2o.Connection;
import org.sql2o.Sql2o;

import java.util.List;

@Repository
public class UserDAO {

    private final Sql2o sql2o;

    public UserDAO(Sql2o sql2o) {
        this.sql2o = sql2o;
    }

    public List<User> getAllUsers() {
        String sql = "SELECT * FROM users";
        try (Connection con = sql2o.open()) {
            return con.createQuery(sql)
                    .addColumnMapping("user_id", "userId")
                    .addColumnMapping("password_hash", "passwordHash")
                    .addColumnMapping("created_at", "createdAt")
                    .addColumnMapping("last_login", "lastLogin")
                    .addColumnMapping("user_preferences", "userPreferences")
                    .executeAndFetch(User.class);
        }
    }

    public User getUserById(int userId) {
        String sql = "SELECT * FROM users WHERE user_id = :userId";
        try (Connection con = sql2o.open()) {
            return con.createQuery(sql)
                    .addParameter("userId", userId)
                    .addColumnMapping("user_id", "userId")
                    .addColumnMapping("password_hash", "passwordHash")
                    .addColumnMapping("created_at", "createdAt")
                    .addColumnMapping("last_login", "lastLogin")
                    .addColumnMapping("user_preferences", "userPreferences")
                    .executeAndFetchFirst(User.class);
        }
    }
}
