package com.capstone.capstone.repository;

import com.capstone.capstone.domain.Post;
import com.capstone.capstone.domain.PostLike;
import com.capstone.capstone.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    boolean existsByPostAndUser(Post post, User user);
}