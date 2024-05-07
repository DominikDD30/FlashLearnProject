package com.example.FlashLearn.infractructure.mapper;

import com.example.FlashLearn.dto.FlashcardDTO;
import com.example.FlashLearn.infractructure.database.entity.FlashcardEntity;
import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;


public interface FlashcardMapper {

    static FlashcardEntity mapToEntity(FlashcardDTO flashcardDTO){
       return FlashcardEntity.builder()
               .flashcardId(flashcardDTO.getId())
                .concept(flashcardDTO.getConcept())
                .definition(flashcardDTO.getDefinition())
                .imagePath(flashcardDTO.getImage())
                .build();
    }

    static FlashcardDTO mapFromEntity(FlashcardEntity flashcardEntity){
        return FlashcardDTO.builder()
                .id(flashcardEntity.getFlashcardId())
                .concept(flashcardEntity.getConcept())
                .definition(flashcardEntity.getDefinition())
                .image(flashcardEntity.getImagePath())
                .build();
    }




}
