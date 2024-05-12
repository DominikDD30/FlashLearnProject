package com.example.FlashLearn.integration;

import com.example.FlashLearn.dto.FlashcardsSetDTO;
import com.example.FlashLearn.fixtures.EntityFixtures;
import com.example.FlashLearn.fixtures.FixturesDTO;
import com.example.FlashLearn.infractructure.database.entity.FlashcardEntity;
import com.example.FlashLearn.infractructure.database.entity.FlashcardsSetEntity;
import com.example.FlashLearn.infractructure.database.repository.FlashcardRepository;
import com.example.FlashLearn.infractructure.database.repository.FlashcardsSetRepository;
import com.example.FlashLearn.infractructure.mapper.FlashcardMapper;
import com.example.FlashLearn.integration.configuration.RestAssuredIntegrationTestBase;
import com.example.FlashLearn.integration.support.FlashcardControllerTestSupport;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.example.FlashLearn.fixtures.FixturesDTO.*;

public class FlashcardsControllerRestAssuredIT extends RestAssuredIntegrationTestBase
implements FlashcardControllerTestSupport {



    @Autowired
    FlashcardsSetRepository flashcardsSetRepository;

    @Autowired
    private FlashcardRepository flashcardRepository;


   @Test
    void thatGetFlashcardsSetWorksCorrectly(){
       //given
       flashcardsSetRepository.deleteAll();
       FlashcardsSetDTO flashcardsSetDTO = FixturesDTO.someFlashcardsSetDto1();

       saveFlashcardSet(flashcardsSetDTO);
       //when
       FlashcardsSetDTO result = getFlashcardsSet(2);

       //then
       Assertions.assertThat(result.getSetName()).isEqualTo(flashcardsSetDTO.getSetName());
       Assertions.assertThat(result.getFlashcards())
               .usingRecursiveFieldByFieldElementComparatorIgnoringFields("id")
               .containsExactlyInAnyOrder(someFlashcardDto1(),someFlashcardDto2(),someFlashcardDto3());

    }
}
