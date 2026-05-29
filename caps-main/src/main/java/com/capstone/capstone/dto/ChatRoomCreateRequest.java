package com.capstone.capstone.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomCreateRequest {
    private String roomName;
    private Long ownerId;
}