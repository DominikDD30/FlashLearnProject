package com.example.FlashLearn.bussines;

import com.example.FlashLearn.dto.game.CardWithPositionEntity;
import com.example.FlashLearn.dto.game.CheckMoveDTO;
import com.example.FlashLearn.dto.game.CheckMoveResponseDTO;
import com.example.FlashLearn.fixtures.EntityFixtures;
import com.example.FlashLearn.infractructure.database.entity.GameEntity;
import com.example.FlashLearn.infractructure.database.repository.FlashcardRepository;
import com.example.FlashLearn.infractructure.database.repository.GameRepository;
import com.example.FlashLearn.service.GameService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class GameServiceTest {

    @InjectMocks
    private GameService gameService;

    @Mock
    private  FlashcardRepository flashcardRepository;



    @Test
    void createCardsCorrectly(){
        int setId=1;
        int pairs=6;
        //given
        Mockito.when(flashcardRepository.findAllBySetId(Mockito.any(Integer.class)))
                .thenReturn(Set.of(
                        EntityFixtures.someFlashcardEntity1(),
                        EntityFixtures.someFlashcardEntity2(),
                        EntityFixtures.someFlashcardEntity3(),
                        EntityFixtures.someFlashcardEntity4(),
                        EntityFixtures.someFlashcardEntity5(),
                        EntityFixtures.someFlashcardEntity6()
                ));


        //when
        List<CardWithPositionEntity> allCreatedCards = gameService.createCardsSet(setId, pairs);

        //then
        Assertions.assertThat(allCreatedCards.size()).isEqualTo(12);
        long pairsAfter = allCreatedCards.stream()
                .map(cardWithPositionEntity -> cardWithPositionEntity.withPosition(0))
                .distinct().count();
        Assertions.assertThat(pairsAfter).isEqualTo(pairs);
    }






}
