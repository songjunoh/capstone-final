package com.capstone.capstone.repository;

import com.capstone.capstone.domain.ChatChannel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatChannelRepository extends JpaRepository<ChatChannel, Long> {
    List<ChatChannel> findByRoomRoomId(Long roomId);
}