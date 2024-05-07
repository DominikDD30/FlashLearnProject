package com.example.FlashLearn.service;

import com.example.FlashLearn.dto.FlashcardsSetDTO;
import com.example.FlashLearn.dto.QuizSetDTO;
import com.example.FlashLearn.dto.SharedSetDTO;
import com.example.FlashLearn.infractructure.database.entity.FlashcardsSetEntity;
import com.example.FlashLearn.infractructure.database.entity.QuizSetEntity;
import com.example.FlashLearn.infractructure.mapper.FlashcardMapper;
import com.example.FlashLearn.infractructure.mapper.QuizMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SharingService {

    private UserService userService;

    public SharedSetDTO buildFlashcardsSetDto(FlashcardsSetEntity flashcardsSet) {
        String ownerName = userService.findUserById(flashcardsSet.getOwner().getUserId()).getUsername();
        return SharedSetDTO.builder()
                .isFlashcardsSet(true)
                .owner(ownerName)
                .flashcardsSetDTO(
                        FlashcardsSetDTO.builder()
                                .setName(flashcardsSet.getName())
                                .flashcards(flashcardsSet.getFlashcards().stream().map(FlashcardMapper::mapFromEntity).toList())
                                .flashcardsAmount(flashcardsSet.getFlashcards().size())
                                .build()
                )
                .build();
    }

    public SharedSetDTO buildQuizSetDto(QuizSetEntity quizSet) {
        String ownerName = userService.findUserById(quizSet.getUser().getUserId()).getUsername();
        return SharedSetDTO.builder()
                .isFlashcardsSet(false)
                .owner(ownerName)
                .quizSetDTO(
                        QuizSetDTO.builder()
                                .setName(quizSet.getName())
                                .quizItems(quizSet.getQuizItems().stream().map(QuizMapper::mapFromEntity).toList())
                                .questionsAmount(quizSet.getQuizItems().size())
                                .build()
                )
                .build();
    }
}
