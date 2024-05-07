package com.example.FlashLearn.jpa;

import com.example.FlashLearn.fixtures.EntityFixtures;
import com.example.FlashLearn.infractructure.database.entity.FlashcardEntity;
import com.example.FlashLearn.infractructure.database.entity.FlashcardsSetEntity;
import com.example.FlashLearn.infractructure.database.entity.UserEntity;
import com.example.FlashLearn.infractructure.database.repository.FlashcardRepository;
import com.example.FlashLearn.infractructure.database.repository.FlashcardsSetRepository;
import com.example.FlashLearn.integration.configuration.PersistenceContainerTestConfiguration;
import lombok.AllArgsConstructor;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDate;
import java.util.List;

import static com.example.FlashLearn.fixtures.EntityFixtures.*;


@DataJpaTest
@TestPropertySource(locations = "classpath:application-test.yml")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(PersistenceContainerTestConfiguration.class)
@AllArgsConstructor(onConstructor = @__(@Autowired))
class FlashcardsSetJpaRepositoryTest {

    private FlashcardRepository flashcardRepository;
    private FlashcardsSetRepository flashcardsSetRepository;

    @Test
    void shouldSaveAndGetAllFlashcards() {
        //given
        UserEntity someUser = someUser();
        FlashcardsSetEntity setEntity = new FlashcardsSetEntity(1, "animals", LocalDate.now(), "asgsags", null, someUser);
        flashcardsSetRepository.save(setEntity);
        flashcardRepository.saveAll(List.of(
                someFlashcardEntity1().withFlashcardsSet(setEntity),
                someFlashcardEntity2().withFlashcardsSet(setEntity),
                someFlashcardEntity3().withFlashcardsSet(setEntity)));
        //when
        List<FlashcardEntity> result = flashcardRepository.findAll();
        //then
        Assertions.assertThat(result).hasSize(3);
        Assertions.assertThat(result)
                .usingRecursiveFieldByFieldElementComparatorIgnoringFields("flashcardId","flashcardsSet")
                .containsExactlyInAnyOrder(someFlashcardEntity1(),someFlashcardEntity2(),someFlashcardEntity3());
    }


}