package com.example.FlashLearn.service;

import com.example.FlashLearn.dto.QuizDTO;
import com.example.FlashLearn.infractructure.database.entity.QuestionEntity;
import com.example.FlashLearn.infractructure.database.entity.QuizEntity;
import com.example.FlashLearn.infractructure.database.repository.AnswerRepository;
import com.example.FlashLearn.infractructure.database.repository.QuestionRepository;
import com.example.FlashLearn.infractructure.database.repository.QuizRepository;
import com.example.FlashLearn.infractructure.mapper.QuizMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class QuizService {

    private QuizRepository quizRepository;
    private QuestionRepository questionRepository;
    private AnswerRepository answerRepository;
    private UserService userService;


    @Transactional
    public void saveSet(QuizDTO quizDTO) {
        QuizEntity quizSet = QuizEntity.builder()
                .name(quizDTO.getSetName())
                .lastTimeUsed(LocalDate.now())
                .shareCode(UUID.randomUUID().toString())
                .questions(quizDTO.getQuestionDTOS().stream().map(QuizMapper::mapToEntity).collect(Collectors.toSet()))
                .user(userService.findUserById(quizDTO.getOwnerId()))
                .build();

        quizRepository.save(quizSet);
        questionRepository.saveAll(quizSet.getQuestions().stream()
                .peek(question -> question.setQuiz(quizSet))
                .collect(Collectors.toSet()));


        for (QuestionEntity questionEntity :quizSet.getQuestions()){
            questionEntity.setAnswers(questionEntity.getAnswers().stream()
                    .peek(answer -> answer.setQuestion(questionEntity)).collect(Collectors.toList()));
        }

        answerRepository.saveAll(quizSet.getQuestions().stream()
                .flatMap(quizEntity -> quizEntity.getAnswers().stream()).toList());

    }

    public List<QuizEntity> getSetsForUser(Integer userId) {
        return quizRepository.getAllByUser_UserId(userId).orElse(List.of());
    }



    public void deleteSet(Integer setId) {
        quizRepository.deleteById(setId);
    }


    public Optional<QuizEntity> getSetByShareCode(String shareCode) {
      return   quizRepository.findByShareCode(shareCode);
    }

    public void updateLastTimeUsed(Integer setId) {
        QuizEntity setEntity = quizRepository.findById(setId).get();
        setEntity.setLastTimeUsed(LocalDate.now());
        quizRepository.save(setEntity);
    }

    public QuizDTO getQuiz(Integer setId) {
       QuizEntity quizEntity = quizRepository.findById(setId).get();
       return QuizDTO.builder()
               .setName(quizEntity.getName())
               .questionDTOS(quizEntity.getQuestions().stream().map(QuizMapper::mapFromEntity).toList())
               .build();
    }
}
