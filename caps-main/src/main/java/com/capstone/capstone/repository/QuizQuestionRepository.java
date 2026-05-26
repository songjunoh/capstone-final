package com.capstone.capstone.repository;

import com.capstone.capstone.domain.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {

    List<QuizQuestion> findBySummaryId(Long summaryId);

    List<QuizQuestion> findByUserId(String userId);
}
