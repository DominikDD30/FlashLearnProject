package com.example.FlashLearn.infractructure.database.repository;

import com.example.FlashLearn.infractructure.database.entity.GameEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<GameEntity,Integer> {

    Optional<GameEntity> findByJoinCode(String joinCode);
}
