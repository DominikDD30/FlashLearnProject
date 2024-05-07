package com.example.FlashLearn.infractructure.database.repository;

import com.example.FlashLearn.infractructure.database.entity.FlashcardsSetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlashcardsSetRepository extends JpaRepository<FlashcardsSetEntity,Integer> {

     Optional<List<FlashcardsSetEntity>> getAllByOwner_UserId(Integer userId);

     Optional<FlashcardsSetEntity> findByShareCode(String shareCode);
}
