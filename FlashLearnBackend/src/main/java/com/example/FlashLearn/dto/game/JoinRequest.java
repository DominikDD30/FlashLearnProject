package com.example.FlashLearn.dto.game;

import com.example.FlashLearn.infractructure.database.entity.GameEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JoinRequest {
    private String joinCode;
    private String playerName;
}
