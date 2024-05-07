package com.example.FlashLearn.fixtures;

import com.example.FlashLearn.dto.*;
import com.example.FlashLearn.infractructure.database.entity.AnswerEntity;
import com.example.FlashLearn.infractructure.database.entity.QuizSetEntity;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import java.util.Set;

public class FixturesDTO {


    public static String someUUID1(){
        return "7b3c9cc4-99fa-4f8b-b759-2107f0a94893";
    }
    public static List<FlashcardSetGroupedByDate>someFlashcardsSetGroupedByDate(){
        return List.of(
                new FlashcardSetGroupedByDate("today",List.of(someFlashcardsSetDto1())),
                new FlashcardSetGroupedByDate("thisWeek",List.of(someFlashcardsSetDto2())
                ));
    }
    public static FlashcardsSetDTO someFlashcardsSetDto1(){
        return FlashcardsSetDTO
                .builder()
                .setName("colors")
                .ownerId(1)
                .flashcards(List.of(someFlashcardDto1(),someFlashcardDto2(),someFlashcardDto3()))
                .shareCode(someUUID1())
                .flashcardsAmount(3)
                .lastTimeUsed(LocalDate.of(2024, Month.APRIL,10))
                .build();
    }

    public static FlashcardsSetDTO someFlashcardsSetDto2() {
        return FlashcardsSetDTO
                .builder()
                .setName("colors2")
                .ownerId(1)
                .flashcards(List.of(someFlashcardDto3(),someFlashcardDto2()))
                .shareCode(someUUID1())
                .flashcardsAmount(3)
                .lastTimeUsed(LocalDate.of(2024, Month.APRIL,2))
                .build();
    }



    public static FlashcardDTO someFlashcardDto1() {
        return FlashcardDTO.builder()
                .id(1)
                .concept("black")
                .definition("czarny")
                .image("some/image/url/13")
                .build();
    }

    public static FlashcardDTO someFlashcardDto2() {
        return FlashcardDTO.builder()
                .id(2)
                .concept("red")
                .definition("czerwony")
                .image("some/image/url/135643")
                .build();
    }

    public static FlashcardDTO someFlashcardDto3() {
        return FlashcardDTO.builder()
                .id(3)
                .concept("blue")
                .definition("niebieski")
                .image("some/image/url/1133")
                .build();
    }


    public static QuizSetDTO someQuizSetDto1(){
        return QuizSetDTO.builder()
                .setId(1)
                .shareCode(someUUID1())
                .setName("facts")
                .quizItems(List.of(someQuizDto1(),someQuizDto2()))
                .questionsAmount(2)
                .build();
    }

    public static QuizSetDTO someQuizSetDto2(){
        return QuizSetDTO.builder()
                .setId(2)
                .setName("facts2")
                .shareCode(someUUID1())
                .quizItems(List.of(someQuizDto2()))
                .questionsAmount(1)
                .build();
    }

    public static QuizDTO someQuizDto1(){
        return new QuizDTO(
                1,
                "is sky blue",
                List.of(someCorrectAnswer1(),someWrongAnswer1())
        );
    }

    public static QuizDTO someQuizDto2(){
        return new QuizDTO(
                2,
                "is water green",
                List.of(someCorrectAnswer2(),someWrongAnswer2())
        );
    }

    public static AnswerDTO someCorrectAnswer1(){
        return new AnswerDTO(
                1,
                "yes",
                true
        );
    }


    public static AnswerDTO someCorrectAnswer2(){
        return new AnswerDTO(
                2,
                "no",
                true
        );
    }

    public static AnswerDTO someWrongAnswer1(){
        return new AnswerDTO(
                3,
                "no",
                false
        );
    }

    public static AnswerDTO someWrongAnswer2(){
        return new AnswerDTO(
                4,
                "yes",
                false
        );
    }





}
