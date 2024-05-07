package com.example.FlashLearn.infractructure.database.repository;

import com.example.FlashLearn.infractructure.database.entity.QuizSetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizSetRepository extends JpaRepository<QuizSetEntity,Integer> {

    Optional<List<QuizSetEntity>> getAllByUser_UserId(Integer userId);

    Optional<QuizSetEntity> findByShareCode(String shareCode);
}
