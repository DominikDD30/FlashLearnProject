package com.example.FlashLearn.infractructure.mapper;

import com.example.FlashLearn.dto.AnswerDTO;
import com.example.FlashLearn.dto.QuestionDTO;
import com.example.FlashLearn.infractructure.database.entity.AnswerEntity;
import com.example.FlashLearn.infractructure.database.entity.QuestionEntity;
import com.example.FlashLearn.infractructure.database.entity.QuizEntity;

import java.util.stream.Collectors;


public interface QuizMapper {

    static QuestionEntity mapToEntity(QuestionDTO questionDTO){
       return QuestionEntity.builder()
               .question(questionDTO.getQuestion())
               .answers(questionDTO.getAnswers().stream().map(QuizMapper::mapToEntity).collect(Collectors.toList()))
                .build();
    }

    static QuestionDTO mapFromEntity(QuestionEntity quizEntity) {
        return new QuestionDTO(quizEntity.getQuestionId(), quizEntity.getQuestion(), quizEntity.getAnswers().stream().map(QuizMapper::mapFromEntity).toList());
    }

    static AnswerDTO mapFromEntity(AnswerEntity answerEntity){
        return new AnswerDTO(answerEntity.getAnswerId(), answerEntity.getValue(),answerEntity.getIsCorrect());
    }
    static AnswerEntity mapToEntity(AnswerDTO answerDTO){
        return AnswerEntity.builder()
                .value(answerDTO.getValue())
                .isCorrect(answerDTO.getIsCorrect())
                .build();
    }



}
