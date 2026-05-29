package com.capstone.capstone.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinRoomRequest {
    private String inviteCode;
    private Long userId;
}