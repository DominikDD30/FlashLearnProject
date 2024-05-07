package com.example.FlashLearn.dto.game;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckMoveResponseDTO {
    private String playerId;
    private String nextPlayerMove;
    private Integer firstPlayerPoints;
    private Integer secondPlayerPoints;
    private Boolean isEnd;
    private Boolean isSuccess;
    private Boolean wasFirstPlayer;
    private String toRemoval;
}
