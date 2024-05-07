package com.example.FlashLearn.service;

import com.example.FlashLearn.dto.CreateRoomRequestDTO;
import com.example.FlashLearn.dto.game.*;
import com.example.FlashLearn.infractructure.database.entity.FlashcardEntity;
import com.example.FlashLearn.infractructure.database.entity.GameEntity;
import com.example.FlashLearn.infractructure.database.repository.FlashcardRepository;
import com.example.FlashLearn.infractructure.database.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final FlashcardRepository flashcardRepository;

    public CreateRoomResponse startRoom(CreateRoomRequestDTO createRoomRequest) {
        GameEntity createdGame = gameRepository.save(GameEntity.builder()
                .playerId("first")
                .secondPlayerId("second")
                .setId(createRoomRequest.getSetId())
                .pairs(createRoomRequest.getPairs())
                .playerPoints(0)
                .secondPlayerPoints(0)
                .joinCode(UUID.randomUUID().toString().substring(0, 23))
                .active(false).build());
        return new CreateRoomResponse(createdGame.getJoinCode());
    }

    public void endGame(Integer gameId) {
        gameRepository.deleteById(gameId);
    }


    public JoinResponse startGame(JoinRequest joinRequest) {
        Optional<GameEntity> result = gameRepository.findByJoinCode(joinRequest.getJoinCode());
        if (result.isPresent()) {
            GameEntity game = result.get();
            game.setSecondPlayerName(joinRequest.getPlayerName());
            game.setActive(true);
            gameRepository.save(game);
            List<CardWithPositionEntity> cards = createCardsSet(game.getSetId(), game.getPairs());
            return new JoinResponse(game, cards, true);
        }
        return new JoinResponse(null, null, false);
    }


    public List<CardWithPositionEntity> createCardsSet(Integer setId, Integer pairs) {
        Set<FlashcardEntity> flashcards = flashcardRepository.findAllBySetId(setId);
        List<FlashcardEntity> flashcardsList = new ArrayList<>(flashcards);
        Collections.shuffle(flashcardsList);
        List<FlashcardEntity> chosenCards = flashcardsList.stream().limit(pairs).toList();
        List<Integer> availablePositions = new ArrayList<>(IntStream.rangeClosed(1, pairs * 2).boxed().toList());
        Collections.shuffle(availablePositions);

        return setCardsPositions(chosenCards, availablePositions);
    }

    private List<CardWithPositionEntity> setCardsPositions(List<FlashcardEntity> chosenCards, List<Integer> availablePositions) {
        List<CardWithPositionEntity> result = new ArrayList<>();
        int j = 0;
        for (FlashcardEntity chosenCard : chosenCards) {
            result.add(new CardWithPositionEntity(chosenCard.getConcept(), chosenCard.getDefinition(),
                    chosenCard.getImagePath(), availablePositions.get(j),true));
            result.add(new CardWithPositionEntity(chosenCard.getConcept(), chosenCard.getDefinition(),
                    chosenCard.getImagePath(), availablePositions.get(j + 1),true));
            j += 2;
        }
        Collections.shuffle(result);
        return result;
    }

    public CheckMoveResponseDTO processMove(CheckMoveDTO move) {
        GameEntity game = gameRepository.findById(move.getGameId()).get();
        boolean wasFirstPlayer = move.getPlayerId().equals(game.getPlayerId());
        boolean wasSuccess = move.getFirstPick().equals(move.getSecondPick());
        String nextPlayer;
        if(wasFirstPlayer){
             nextPlayer=wasSuccess ?game.getPlayerId():game.getSecondPlayerId();
        }else{
            nextPlayer=wasSuccess? game.getSecondPlayerId() : game.getPlayerId();
        }

        if (wasSuccess) {
            if (wasFirstPlayer) {
                game.setPlayerPoints(game.getPlayerPoints() + 1);
            } else {
                game.setSecondPlayerPoints(game.getSecondPlayerPoints() + 1);
            }
        }
        String toRemoval=wasSuccess?move.getFirstPick():null;
        GameEntity updatedGame = gameRepository.save(game);
        Boolean isEnd = (updatedGame.getPlayerPoints() + updatedGame.getSecondPlayerPoints()) == updatedGame.getPairs();
        if(isEnd){
            endGame(game.getGameId());
        }
        return new CheckMoveResponseDTO(move.getPlayerId(),nextPlayer, updatedGame.getPlayerPoints(),
                updatedGame.getSecondPlayerPoints(), isEnd,wasSuccess,wasFirstPlayer,toRemoval);
    }


}
