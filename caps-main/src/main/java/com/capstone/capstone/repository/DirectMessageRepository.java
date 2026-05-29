package com.capstone.capstone.repository;

import com.capstone.capstone.domain.DirectMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DirectMessageRepository extends JpaRepository<DirectMessage, Long> {

    List<DirectMessage> findByRoomRoomIdAndSenderUserIdAndReceiverUserIdOrRoomRoomIdAndSenderUserIdAndReceiverUserIdOrderByCreatedAtAsc(
            Long roomId1, Long senderId1, Long receiverId1,
            Long roomId2, Long senderId2, Long receiverId2);
}