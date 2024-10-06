package com.bu.coursebuilderchatbotms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserCreationDTO {
    private String authId;
    private String email;
    private String password;
    private String passwordHash;
    private String fName;
    private String lName;
    private String programCode;
    private List<String> courseTaken;
    private String pathInterest;
    private Integer courseToTake;
}
