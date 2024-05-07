package com.example.FlashLearn.infractructure.database.entity;

import com.example.FlashLearn.dto.game.CardWithPositionEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@With
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"gameId","playerId","secondPlayerId"})
@ToString(of = {"gameId","playerId","secondPlayerId"})
@Entity
@Table(name = "game")
public class GameEntity {

    @Id
    @Column(name = "game_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer gameId;

    @Column(name = "set_id")
    private Integer setId;

    @Column(name = "pairs")
    private Integer pairs;

    @Column(name = "join_code")
    private String joinCode;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "player_id")
    private String playerId;

    @Column(name = "player_points")
    private Integer playerPoints;

    @Column(name = "second_player_points")
    private Integer secondPlayerPoints;

    @Column(name = "second_player_id")
    private String secondPlayerId;

    @Column(name = "second_player_name")
    private String secondPlayerName;



}
