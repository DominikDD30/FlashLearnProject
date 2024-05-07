package com.example.FlashLearn.infractructure.mapper;

import com.example.FlashLearn.dto.AnswerDTO;
import com.example.FlashLearn.dto.FlashcardDTO;
import com.example.FlashLearn.dto.QuizDTO;
import com.example.FlashLearn.infractructure.database.entity.AnswerEntity;
import com.example.FlashLearn.infractructure.database.entity.FlashcardEntity;
import com.example.FlashLearn.infractructure.database.entity.QuizEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


public interface QuizMapper {

    static QuizEntity mapToEntity(QuizDTO quizDTO){
       return QuizEntity.builder()
//               .quizId(quizDTO.getId())
               .question(quizDTO.getQuestion())
               .answers(quizDTO.getAnswers().stream().map(QuizMapper::mapToEntity).collect(Collectors.toList()))
                .build();
    }

    static QuizDTO mapFromEntity(QuizEntity quizEntity) {
        return new QuizDTO(quizEntity.getQuizId(), quizEntity.getQuestion(), quizEntity.getAnswers().stream().map(QuizMapper::mapFromEntity).toList());
    }

    static AnswerDTO mapFromEntity(AnswerEntity answerEntity){
        return new AnswerDTO(answerEntity.getAnswerId(), answerEntity.getValue(),answerEntity.getIsCorrect());
    }
    static AnswerEntity mapToEntity(AnswerDTO answerDTO){
        return AnswerEntity.builder()
//                .answerId(answerDTO.getId())
                .value(answerDTO.getValue())
                .isCorrect(answerDTO.getIsCorrect())
                .build();
    }



}
