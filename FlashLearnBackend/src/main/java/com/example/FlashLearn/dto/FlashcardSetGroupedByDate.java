package com.example.FlashLearn.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FlashcardSetGroupedByDate{
    private String date;
    private List<FlashcardsSetDTO> setsList;
}
