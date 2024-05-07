package com.example.FlashLearn.dto.game;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

@Data
@With
@AllArgsConstructor
@NoArgsConstructor
public class CardWithPositionEntity {
    private String concept;
    private String definition;
    private String image;
    private int position;
    private Boolean visible;
}
