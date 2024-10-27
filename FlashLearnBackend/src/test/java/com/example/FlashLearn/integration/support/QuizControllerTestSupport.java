package com.example.FlashLearn.integration.support;

import com.example.FlashLearn.dto.QuizDTO;
import io.restassured.specification.RequestSpecification;
import org.springframework.http.HttpStatus;

import static com.example.FlashLearn.controller.QuizController.QUIZ;

public interface QuizControllerTestSupport {

    RequestSpecification requestSpecification();

    default void saveQuizSet(final QuizDTO quiz){
         requestSpecification()
                 .body(quiz)
                .post(QUIZ)
                .then()
                .statusCode(HttpStatus.OK.value());
    }
}
