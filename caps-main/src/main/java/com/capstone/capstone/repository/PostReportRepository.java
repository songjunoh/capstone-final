package com.capstone.capstone.repository;

import com.capstone.capstone.domain.PostReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostReportRepository extends JpaRepository<PostReport, Long> {
    boolean existsByPostPostIdAndUserUserId(Long postId, Long userId);
}