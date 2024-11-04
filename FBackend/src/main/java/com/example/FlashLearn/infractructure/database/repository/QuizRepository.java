package com.example.FlashLearn.infractructure.database.repository;

import com.example.FlashLearn.infractructure.database.entity.QuizEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<QuizEntity,Integer> {

    Optional<List<QuizEntity>> getAllByUser_UserId(Integer userId);

    Optional<QuizEntity> findByShareCode(String shareCode);
}
