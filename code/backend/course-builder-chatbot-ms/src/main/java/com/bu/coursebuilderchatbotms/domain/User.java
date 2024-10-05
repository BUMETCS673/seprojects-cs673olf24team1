package com.bu.coursebuilderchatbotms.domain;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class User {
    private int userId;
    private String authId;
    private String email;
    private String passwordHash;
    private String fName;
    private String lName;
    private String programCode;
    private String course_taken;
    private String pathInterest;
    private Integer courseToTake;
}
