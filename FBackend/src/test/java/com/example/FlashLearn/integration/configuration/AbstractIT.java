package com.example.FlashLearn.integration.configuration;

import com.example.FlashLearn.FlashLearnApplication;
import com.example.FlashLearn.infractructure.database.repository.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
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
    private QuestionRepository questionRepository;

    @Autowired
    private QuizRepository quizRepository;
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
