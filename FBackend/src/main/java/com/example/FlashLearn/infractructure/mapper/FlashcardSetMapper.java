package com.example.FlashLearn.infractructure.mapper;

import com.example.FlashLearn.dto.FlashcardDTO;
import com.example.FlashLearn.dto.FlashcardsSetDTO;
import com.example.FlashLearn.infractructure.database.entity.FlashcardEntity;
import com.example.FlashLearn.infractructure.database.entity.FlashcardsSetEntity;

public interface FlashcardSetMapper {

    static FlashcardsSetDTO mapFromEntity(FlashcardsSetEntity flashcardsSet){
        return FlashcardsSetDTO.builder()
                .setName(flashcardsSet.getName())
                .flashcards(flashcardsSet.getFlashcards().stream().map(FlashcardMapper::mapFromEntity).toList())
                .build();
    }
}
