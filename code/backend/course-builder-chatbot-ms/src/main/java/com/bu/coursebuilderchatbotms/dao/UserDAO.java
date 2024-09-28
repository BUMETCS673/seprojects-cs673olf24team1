package com.bu.coursebuilderchatbotms.dao;

import com.bu.coursebuilderchatbotms.domain.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Repository;
import org.sql2o.Connection;
import org.sql2o.Sql2o;
import java.util.List;

@Repository
public class UserDAO {

    private final Sql2o sql2o;
    private final ObjectMapper objectMapper;

    public UserDAO(Sql2o sql2o, ObjectMapper objectMapper) {
        this.sql2o = sql2o;
        this.objectMapper = objectMapper;
    }

    public User createUser(User user) {
        String sql = "INSERT INTO users (username, email, password_hash, course_taken, path_interest, course_to_take) " +
                "VALUES (:username, :email, :passwordHash, :courseTaken::jsonb, :pathInterest, :courseToTake)";
        try (Connection con = sql2o.open()) {
            int userId = (int) con.createQuery(sql, true)
                    .addParameter("username", user.getUsername())
                    .addParameter("email", user.getEmail())
                    .addParameter("passwordHash", user.getPasswordHash())
                    .addParameter("courseTaken", user.getCourse_taken())
                    .addParameter("pathInterest", user.getPath_interest())
                    .addParameter("courseToTake", user.getCourse_to_take())
                    .executeUpdate()
                    .getKey();
            user.setUserId(userId);
            return user;
        }
    }

    public User getUserById(int userId) {
        String sql = "SELECT * FROM users WHERE user_id = :userId";
        try (Connection con = sql2o.open()) {
            User user = con.createQuery(sql)
                    .addParameter("userId", userId)
                    .addColumnMapping("user_id", "userId")
                    .addColumnMapping("password_hash", "passwordHash")
                    .addColumnMapping("created_at", "createdAt")
                    .addColumnMapping("last_login", "lastLogin")
                    .addColumnMapping("user_preferences", "userPreferences")
                    .addColumnMapping("course_taken", "course_taken")
                    .addColumnMapping("path_interest", "path_interest")
                    .addColumnMapping("course_to_take", "course_to_take")
                    .executeAndFetchFirst(User.class);
            return user;
        }
    }

    public User getUserByUsername(String username) {
        String sql = "SELECT * FROM users WHERE username=:username";
        try (Connection con = sql2o.open()) {
            User user = con.createQuery(sql)
                    .addParameter("username", username)
                    .addColumnMapping("user_id", "userId")
                    .addColumnMapping("password_hash", "passwordHash")
                    .addColumnMapping("created_at", "createdAt")
                    .addColumnMapping("last_login", "lastLogin")
                    .addColumnMapping("user_preferences", "userPreferences")
                    .addColumnMapping("course_taken", "course_taken")
                    .addColumnMapping("path_interest", "path_interest")
                    .addColumnMapping("course_to_take", "course_to_take")
                    .executeAndFetchFirst(User.class);
            return user;
        }
    }

    public List<String> getCourseTakenAsList(User user) {
        try {
            return objectMapper.readValue(user.getCourse_taken(), new TypeReference<List<String>>(){});
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing JSON", e);
        }
    }

    public void setCourseTakenFromList(User user, List<String> courseTaken) {
        try {
            user.setCourse_taken(objectMapper.writeValueAsString(courseTaken));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing JSON", e);
        }
    }
}