package com.bu.coursebuilderchatbotms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserCreationDTO {
    private String username;
    private String email;
    private String passwordHash;
    private String course_taken;
    private String path_interest;
    private Integer course_to_take;
}