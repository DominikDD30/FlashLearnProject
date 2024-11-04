package com.example.FlashLearn.integration;

import com.example.FlashLearn.dto.QuizDTO;
import com.example.FlashLearn.fixtures.EntityFixtures;
import com.example.FlashLearn.infractructure.database.entity.*;
import com.example.FlashLearn.infractructure.database.repository.*;
import com.example.FlashLearn.integration.configuration.RestAssuredIntegrationTestBase;
import com.example.FlashLearn.integration.support.QuizControllerTestSupport;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static com.example.FlashLearn.fixtures.FixturesDTO.*;

public class QuizControllerRestAssuredIT extends RestAssuredIntegrationTestBase
implements QuizControllerTestSupport {



    @Autowired
    QuizRepository quizRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AnswerRepository answerRepository;



   @Test
    void thatSaveQuizWorksCorrectly(){
       //given
       UserEntity someUser = EntityFixtures.someUser();
       QuizDTO quizSetDTO = someQuizDto1().withOwnerId(someUser.getUserId());

       //when
       userRepository.save(someUser);
       saveQuizSet(quizSetDTO);

       List<QuizEntity> result =  quizRepository.findAll();

       List<AnswerEntity> createdAnswers = answerRepository.findAll();
       List<QuestionEntity> createdQuestions = questionRepository.findAll();

       //then
       Assertions.assertThat(result).hasSize(1);
       Assertions.assertThat(result.get(0).getName()).isEqualTo(quizSetDTO.getSetName());
       Assertions.assertThat(createdAnswers).isNotEmpty();
       Assertions.assertThat(createdQuestions).isNotEmpty();
    }
}
