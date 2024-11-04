package com.example.FlashLearn.controller;

import com.example.FlashLearn.dto.FlashcardSetGroupedByDate;
import com.example.FlashLearn.fixtures.FixturesDTO;
import com.example.FlashLearn.service.FlashcardService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Map;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FlashcardControllerTest {


    @InjectMocks
    private FlashcardController flashcardController;

    @Mock
    private  FlashcardService flashcardService;

    @Test
    void thatGetFlashcardsSetWorkCorrectly() {
        //given
        int userId=1;
        when(flashcardService.getSetsForUser(userId))
                .thenReturn(Map.of(
                        "today", List.of(FixturesDTO.someFlashcardsSetDto1()),
                        "thisWeek",List.of(FixturesDTO.someFlashcardsSetDto2())
                ));

        //when
        List<FlashcardSetGroupedByDate> result = flashcardController.getFlashcardSetsForUser(userId);
        //the
        assertThat(result)
                .containsExactlyInAnyOrder(
                        FixturesDTO.someFlashcardsSetGroupedByDate().get(0),
                        FixturesDTO.someFlashcardsSetGroupedByDate().get(1));
    }

}