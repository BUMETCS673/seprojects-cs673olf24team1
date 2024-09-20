package com.bu.coursebuilderchatbotms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DTO {
    private Long id;
    private String name;
    private double pledgedAmount;
}