package com.capstone.capstone.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChatRoomResponse {
    private Long roomId;
    private String roomName;
    private String inviteCode;
    private Long ownerId;
    private String ownerName;
}