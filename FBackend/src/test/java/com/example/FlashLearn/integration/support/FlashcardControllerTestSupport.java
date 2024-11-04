package com.example.FlashLearn.integration.support;

import com.example.FlashLearn.dto.FlashcardsSetDTO;
import io.restassured.specification.RequestSpecification;
import org.springframework.http.HttpStatus;

import static com.example.FlashLearn.controller.FlashcardController.FLASHCARDS;

public interface FlashcardControllerTestSupport {

    RequestSpecification requestSpecification();

    default FlashcardsSetDTO getFlashcardsSet(int id){
        return requestSpecification()
                .get(FLASHCARDS+"/"+id)
                .then()
                .statusCode(HttpStatus.OK.value())
                .and()
                .extract()
                .as(FlashcardsSetDTO.class);
    }

    default void saveFlashcardSet(final FlashcardsSetDTO flashcardsSet){
        requestSpecification()
                .body(flashcardsSet)
                .post(FLASHCARDS)
                .then()
                .statusCode(HttpStatus.OK.value());
    }
}
