package com.example.FlashLearn.integration.configuration;

import com.example.FlashLearn.FlashLearnApplication;
import com.example.FlashLearn.infractructure.database.repository.*;
import org.junit.jupiter.api.AfterEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@ActiveProfiles("test")
@TestPropertySource(locations = "classpath:application-test.yml")
@Import(PersistenceContainerTestConfiguration.class)
@SpringBootTest(
        classes = FlashLearnApplication.class,
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
public abstract class AbstractIT {

    @Autowired
    private FlashcardsSetRepository flashcardsSetRepository;

    @Autowired
    private FlashcardRepository flashcardRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private AnswerRepository answerRepository;


    @AfterEach
    public void after() {
        flashcardsSetRepository.deleteAll();
        flashcardRepository.deleteAll();
        quizRepository.deleteAll();
        questionRepository.deleteAll();
        answerRepository.deleteAll();
    }




}
