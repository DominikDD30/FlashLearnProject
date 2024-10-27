package com.example.FlashLearn.dto;

import lombok.*;

import java.util.List;

@Data
@With
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizDTO {
    private int quizId;
    private int ownerId;
    private String setName;
    private String shareCode;
    private List<QuestionDTO> questionDTOS;
    private Integer questionsAmount;
}
