package com.bu.coursebuilderchatbotms.dao;

import com.bu.coursebuilderchatbotms.domain.User;
import com.bu.coursebuilderchatbotms.utils.StringUtils;
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

    public void createUser(User user) {
        String sql = "INSERT INTO users (auth_id, email, password_hash, f_name, l_name, program_code, course_taken, path_interest, course_to_take) " +
                "VALUES (:authId, :email, :passwordHash, :fName, :lName, :programCode, CAST(:courseTaken AS jsonb), :pathInterest, :courseToTake)";

        try (Connection conn = sql2o.open()) {
            conn.createQuery(sql)
                    .addParameter("authId", user.getAuthId())
                    .addParameter("email", user.getEmail())
                    .addParameter("passwordHash", user.getPasswordHash())
                    .addParameter("fName", "bu1234")
                    .addParameter("lName", "bu1234")
                    .addParameter( "programCode", user.getProgramCode())
                    .addParameter("courseTaken", user.getCourse_taken())
                    .addParameter("pathInterest", user.getPathInterest())
                    .addParameter("courseToTake", user.getCourseToTake())
                    .executeUpdate();
        }
    }

    public User getUserById(int userId) {
        String sql = "SELECT * FROM users WHERE user_id = :userId";
        try (Connection con = sql2o.open()) {
            User user = con.createQuery(sql)
                    .addParameter("userId", userId)
                    .addColumnMapping("user_id", "userId")
                    .addColumnMapping("auth_id", "authId")
                    .addColumnMapping("password_hash", "passwordHash")
                    .addColumnMapping("f_name", "fName")
                    .addColumnMapping("l_name", "lName")
                    .addColumnMapping("program_code", "programCode")
                    .addColumnMapping("course_taken", "course_taken")
                    .addColumnMapping("path_interest", "pathInterest")
                    .addColumnMapping("course_to_take", "courseToTake")
                    .addColumnMapping("created_at", "createdAt")
                    .addColumnMapping("last_login", "lastLogin")
                    .executeAndFetchFirst(User.class);
            if (user.getCourse_taken() != null) {
                String formattedCourseTaken = StringUtils.convertJsonArrayToSingleQuotes(user.getCourse_taken());
                user.setCourse_taken(formattedCourseTaken);
            }

            return user;
        }
    }

    public User getUserByUsername(String username) {
        String sql = "SELECT * FROM users WHERE auth_id = :authId";
        try (Connection con = sql2o.open()) {
            User user = con.createQuery(sql)
                    .addParameter("authId", username)
                    .addColumnMapping("user_id", "userId")
                    .addColumnMapping("auth_id", "authId")
                    .addColumnMapping("password_hash", "passwordHash")
                    .addColumnMapping("f_name", "fName")
                    .addColumnMapping("l_name", "lName")
                    .addColumnMapping("program_code", "programCode")
                    .addColumnMapping("course_taken", "course_taken")
                    .addColumnMapping("path_interest", "pathInterest")
                    .addColumnMapping("course_to_take", "courseToTake")
                    .addColumnMapping("created_at", "createdAt")
                    .addColumnMapping("last_login", "lastLogin")
                    .executeAndFetchFirst(User.class);

            if (user != null && user.getCourse_taken() != null) {
                String formattedCourseTaken = StringUtils.convertJsonArrayToSingleQuotes(user.getCourse_taken());
                user.setCourse_taken(formattedCourseTaken);
            }

            return user;
        }
    }
}