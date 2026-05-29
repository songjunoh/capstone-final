package com.capstone.capstone.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private String loginId;
    private String password;
    private String email;
    private String name;
    private Integer grade;
}