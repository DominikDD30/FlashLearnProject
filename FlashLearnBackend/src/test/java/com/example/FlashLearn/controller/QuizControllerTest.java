package com.example.FlashLearn.controller;

import com.example.FlashLearn.dto.QuizSetDTO;
import com.example.FlashLearn.fixtures.EntityFixtures;
import com.example.FlashLearn.fixtures.FixturesDTO;
import com.example.FlashLearn.service.QuizService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class QuizControllerTest {
    @InjectMocks
    private QuizController quizController;

    @Mock
    private QuizService quizService;

    @Test
    void thatGetSetsForUserWorkCorrectly() {
        //given
        int userId=1;
        when(quizService.getSetsForUser(userId))
                .thenReturn(List.of(EntityFixtures.someQuizSetEntity1(),EntityFixtures.someQuizSetEntity2()));

        //when
        List<QuizSetDTO> result = quizController.getSetsForUser(userId);
        //then
        assertThat(result)
                .usingRecursiveFieldByFieldElementComparatorIgnoringFields("quizItems")
                .containsExactlyInAnyOrder(
                        FixturesDTO.someQuizSetDto1(),
                        FixturesDTO.someQuizSetDto2());
    }

}