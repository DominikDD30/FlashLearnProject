package com.example.FlashLearn.controller;

import com.example.FlashLearn.dto.CreateRoomRequestDTO;
import com.example.FlashLearn.dto.game.*;
import com.example.FlashLearn.service.GameService;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.FlashLearn.controller.GameController.GAME;


@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping(GAME)
public class GameController {

    public static final String GAME="/game";
    private final GameService gameService;

    @PostMapping
    public CreateRoomResponse createRoom(@RequestBody CreateRoomRequestDTO createRoomRequest)
    {
        return gameService.startRoom(createRoomRequest);
    }

    @GetMapping("/solo")
    public List<CardWithPositionEntity> createSoloGame(@RequestParam Integer setId,@RequestParam Integer dificulity) {
        return gameService.createCardsSet(setId,dificulity);
    }

    @MessageMapping("/join")
    @SendTo("/room/join")
    public JoinResponse joinGame(@Payload JoinRequest joinRequest) {
        return gameService.startGame(joinRequest);
    }

    @MessageMapping("/move")
    @SendTo("/room/move")
    public CheckMoveResponseDTO checkMove(@Payload CheckMoveDTO move) {
        return gameService.processMove(move);
    }

    @MessageMapping("/moveView")
    @SendTo("/room/moveView")
    public MoveView processMove(String position) {
        return new MoveView(position);
    }


    @DeleteMapping
    public void endGame(Integer gameId){
         gameService.endGame(gameId);
    }


}
