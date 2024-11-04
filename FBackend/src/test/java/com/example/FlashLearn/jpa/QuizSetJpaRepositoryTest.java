package com.example.FlashLearn.jpa;

import com.example.FlashLearn.fixtures.EntityFixtures;
import com.example.FlashLearn.infractructure.database.entity.QuestionEntity;
import com.example.FlashLearn.infractructure.database.entity.QuizEntity;
import com.example.FlashLearn.infractructure.database.entity.UserEntity;
import com.example.FlashLearn.infractructure.database.repository.AnswerRepository;
import com.example.FlashLearn.infractructure.database.repository.QuestionRepository;
import com.example.FlashLearn.infractructure.database.repository.QuizRepository;
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


    private QuizRepository quizRepository;
    private QuestionRepository questionRepository;

    @Test
    void shouldSaveAndGetAllQuiz() {
        //given
        questionRepository.deleteAll();
        UserEntity someUser = someUser();
        QuizEntity quizSetEntity = someQuizEntity1().withQuizId(null).withUser(someUser).withQuestions(null);
        quizRepository.save(quizSetEntity);

        questionRepository.saveAll(List.of(
                EntityFixtures.someQuestionEntity1().withQuestionId(null).withQuiz(quizSetEntity).withAnswers(null),
                EntityFixtures.someQuestionEntity2().withQuestionId(null).withQuiz(quizSetEntity).withAnswers(null)));

        //when
        List<QuestionEntity> result = questionRepository.findAll();
        //then
        Assertions.assertThat(result).hasSize(2);
        Assertions.assertThat(result)
                .usingRecursiveFieldByFieldElementComparatorIgnoringFields("questionId","answers","quiz")
                .containsExactlyInAnyOrder(EntityFixtures.someQuestionEntity1(),EntityFixtures.someQuestionEntity2());
    }
}
