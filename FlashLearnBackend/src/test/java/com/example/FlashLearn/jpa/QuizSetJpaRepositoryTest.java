package com.example.FlashLearn.jpa;

import com.example.FlashLearn.fixtures.EntityFixtures;
import com.example.FlashLearn.infractructure.database.entity.AnswerEntity;
import com.example.FlashLearn.infractructure.database.entity.QuizEntity;
import com.example.FlashLearn.infractructure.database.entity.QuizSetEntity;
import com.example.FlashLearn.infractructure.database.entity.UserEntity;
import com.example.FlashLearn.infractructure.database.repository.AnswerRepository;
import com.example.FlashLearn.infractructure.database.repository.QuizRepository;
import com.example.FlashLearn.infractructure.database.repository.QuizSetRepository;
import com.example.FlashLearn.integration.configuration.PersistenceContainerTestConfiguration;
import lombok.AllArgsConstructor;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;

import java.util.List;

import static com.example.FlashLearn.fixtures.EntityFixtures.*;


@DataJpaTest
@TestPropertySource(locations = "classpath:application-test.yml")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(PersistenceContainerTestConfiguration.class)
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class QuizSetJpaRepositoryTest {


    private QuizSetRepository quizSetRepository;
    private QuizRepository quizRepository;
    private AnswerRepository answerRepository;

    @Test
    void shouldSaveAndGetAllQuiz() {
        //given
        quizRepository.deleteAll();
        UserEntity someUser = someUser();
        QuizSetEntity quizSetEntity = someQuizSetEntity1().withQuizSetId(null).withUser(someUser).withQuizItems(null);
        quizSetRepository.save(quizSetEntity);

        quizRepository.saveAll(List.of(
                EntityFixtures.someQuizEntity1().withQuizId(null).withQuizSet(quizSetEntity).withAnswers(null),
                EntityFixtures.someQuizEntity2().withQuizId(null).withQuizSet(quizSetEntity).withAnswers(null)));

        //when
        List<QuizEntity> result = quizRepository.findAll();
        //then
        Assertions.assertThat(result).hasSize(2);
        Assertions.assertThat(result)
                .usingRecursiveFieldByFieldElementComparatorIgnoringFields("quizId","answers","quizSet")
                .containsExactlyInAnyOrder(EntityFixtures.someQuizEntity1(),EntityFixtures.someQuizEntity2());
    }
}
