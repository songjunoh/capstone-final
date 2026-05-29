package com.capstone.capstone.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DirectMessageRequest {
    private Long roomId;
    private Long senderId;
    private Long receiverId;
    private String content;
}