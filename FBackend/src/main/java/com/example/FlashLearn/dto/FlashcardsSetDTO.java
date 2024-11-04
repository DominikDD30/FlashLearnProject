package com.example.FlashLearn.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Data
@With
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FlashcardsSetDTO {
    private int id;
    private int ownerId;
    private String setName;
    private List<FlashcardDTO> flashcards;
    private LocalDate lastTimeUsed;
    private String shareCode;
    private Integer flashcardsAmount;
}
