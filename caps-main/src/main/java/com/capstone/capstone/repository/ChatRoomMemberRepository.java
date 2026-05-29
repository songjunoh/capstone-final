package com.capstone.capstone.repository;

import com.capstone.capstone.domain.ChatRoom;
import com.capstone.capstone.domain.ChatRoomMember;
import com.capstone.capstone.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, Long> {
    boolean existsByRoomAndUser(ChatRoom room, User user);

    List<ChatRoomMember> findByRoomRoomId(Long roomId);

    void deleteByRoomRoomIdAndUserUserId(Long roomId, Long userId);
}