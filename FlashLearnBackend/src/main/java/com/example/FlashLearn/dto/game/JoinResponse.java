package com.example.FlashLearn.dto.game;

import com.example.FlashLearn.infractructure.database.entity.GameEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JoinResponse {
    private GameEntity game;
    private List<CardWithPositionEntity> cards;
    private Boolean joined;
}
