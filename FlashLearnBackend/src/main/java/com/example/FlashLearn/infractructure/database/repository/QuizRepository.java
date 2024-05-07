package com.example.FlashLearn.infractructure.database.repository;

import com.example.FlashLearn.infractructure.database.entity.QuizEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface QuizRepository extends JpaRepository<QuizEntity,Integer> {

}
