package com.capstone.capstone.repository;

import com.capstone.capstone.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostPostIdAndDeletedFalseOrderByCreatedAtAsc(Long postId);
}