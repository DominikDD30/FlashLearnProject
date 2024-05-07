package com.example.FlashLearn.integration;

import com.example.FlashLearn.dto.FlashcardsSetDTO;
import com.example.FlashLearn.dto.QuizSetDTO;
import com.example.FlashLearn.fixtures.EntityFixtures;
import com.example.FlashLearn.fixtures.FixturesDTO;
import com.example.FlashLearn.infractructure.database.entity.*;
import com.example.FlashLearn.infractructure.database.repository.*;
import com.example.FlashLearn.infractructure.mapper.FlashcardMapper;
import com.example.FlashLearn.infractructure.mapper.QuizMapper;
import com.example.FlashLearn.integration.configuration.RestAssuredIntegrationTestBase;
import com.example.FlashLearn.integration.support.FlashcardControllerTestSupport;
import com.example.FlashLearn.integration.support.QuizControllerTestSupport;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.example.FlashLearn.fixtures.FixturesDTO.*;

public class QuizControllerRestAssuredIT extends RestAssuredIntegrationTestBase
implements QuizControllerTestSupport {



    @Autowired
    QuizSetRepository quizSetRepository;

    @Autowired
    QuizRepository quizRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AnswerRepository answerRepository;



   @Test
    void thatSaveQuizSetWorksCorrectly(){
       //given
       UserEntity someUser = EntityFixtures.someUser();
       QuizSetDTO quizSetDTO = someQuizSetDto1().withOwnerId(someUser.getUserId());

       //when
       userRepository.save(someUser);
       saveQuizSet(quizSetDTO);

       List<QuizSetEntity> result =  quizSetRepository.findAll();

       List<AnswerEntity> createdAnswers = answerRepository.findAll();
       List<QuizEntity> createdQuiz = quizRepository.findAll();

       //then
       Assertions.assertThat(result).hasSize(1);
       Assertions.assertThat(result.get(0).getName()).isEqualTo(quizSetDTO.getSetName());
       Assertions.assertThat(createdAnswers).isNotEmpty();
       Assertions.assertThat(createdQuiz).isNotEmpty();
    }
}
