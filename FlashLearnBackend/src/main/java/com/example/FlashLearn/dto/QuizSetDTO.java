package com.example.FlashLearn.dto;

import lombok.*;

import java.util.List;

@Data
@With
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizSetDTO {
    private int setId;
    private int ownerId;
    private String setName;
    private String shareCode;
    private List<QuizDTO> quizItems;
    private Integer questionsAmount;
}
