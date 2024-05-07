package com.example.FlashLearn.infractructure.database.repository;

import com.example.FlashLearn.infractructure.database.entity.FlashcardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;


public interface FlashcardRepository extends JpaRepository<FlashcardEntity,Integer> {

    @Query(value = "select * from flashcard f where f.flashcards_set_id =:setId",nativeQuery = true)
    Set<FlashcardEntity> findAllBySetId(@Param("setId") Integer setId);
}
