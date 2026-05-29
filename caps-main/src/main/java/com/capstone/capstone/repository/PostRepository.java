package com.capstone.capstone.repository;

import com.capstone.capstone.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByDeletedFalseOrderByCreatedAtDesc();
}