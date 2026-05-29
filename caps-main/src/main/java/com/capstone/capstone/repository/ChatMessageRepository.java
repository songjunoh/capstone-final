package com.capstone.capstone.repository;

import com.capstone.capstone.domain.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByChannelChannelIdOrderByCreatedAtAsc(Long channelId);
}