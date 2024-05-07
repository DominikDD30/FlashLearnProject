package com.example.FlashLearn.integration.support;

import com.example.FlashLearn.dto.FlashcardsSetDTO;
import com.example.FlashLearn.dto.QuizSetDTO;
import io.restassured.specification.RequestSpecification;
import org.springframework.http.HttpStatus;

import static com.example.FlashLearn.controller.FlashcardController.FLASHCARDS;
import static com.example.FlashLearn.controller.QuizController.QUIZ;

public interface QuizControllerTestSupport {

    RequestSpecification requestSpecification();

    default void saveQuizSet(final  QuizSetDTO quizSet){
         requestSpecification()
                 .body(quizSet)
                .post(QUIZ)
                .then()
                .statusCode(HttpStatus.OK.value());
    }
}
