package com.example.FlashLearn.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizDTO {
    private Integer id;
    private String question;
    private List<AnswerDTO> answers;
}
