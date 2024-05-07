package com.example.FlashLearn.dto.game;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckMoveDTO {
    private Integer gameId;
    private String playerId;
    private String firstPick;
    private String secondPick;
}
