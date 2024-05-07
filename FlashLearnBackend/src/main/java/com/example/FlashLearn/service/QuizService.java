package com.example.FlashLearn.service;

import com.example.FlashLearn.dto.QuizSetDTO;
import com.example.FlashLearn.infractructure.database.entity.AnswerEntity;
import com.example.FlashLearn.infractructure.database.entity.QuizEntity;
import com.example.FlashLearn.infractructure.database.entity.QuizSetEntity;
import com.example.FlashLearn.infractructure.database.repository.AnswerRepository;
import com.example.FlashLearn.infractructure.database.repository.QuizRepository;
import com.example.FlashLearn.infractructure.database.repository.QuizSetRepository;
import com.example.FlashLearn.infractructure.mapper.QuizMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class QuizService {

    private QuizSetRepository quizSetRepository;
    private QuizRepository quizRepository;
    private AnswerRepository answerRepository;
    private UserService userService;


    @Transactional
    public void saveSet(QuizSetDTO quizSetDTO) {
        QuizSetEntity quizSet = QuizSetEntity.builder()
                .name(quizSetDTO.getSetName())
                .lastTimeUsed(LocalDate.now())
                .shareCode(UUID.randomUUID().toString())
                .quizItems(quizSetDTO.getQuizItems().stream().map(QuizMapper::mapToEntity).collect(Collectors.toSet()))
                .user(userService.findUserById(quizSetDTO.getOwnerId()))
                .build();

        quizSetRepository.save(quizSet);
        quizRepository.saveAll(quizSet.getQuizItems().stream()
                .peek(quizEntity -> quizEntity.setQuizSet(quizSet)).collect(Collectors.toSet()));


        for (QuizEntity quizEntity:quizSet.getQuizItems()){
            quizEntity.setAnswers(quizEntity.getAnswers().stream()
                    .peek(answer -> answer.setQuiz(quizEntity)).collect(Collectors.toList()));
        }

        answerRepository.saveAll(quizSet.getQuizItems().stream()
                .flatMap(quizEntity -> quizEntity.getAnswers().stream()).toList());

    }

    public List<QuizSetEntity> getSetsForUser(Integer userId) {
        return quizSetRepository.getAllByUser_UserId(userId).orElse(List.of());
    }



    public void deleteSet(Integer setId) {
        quizSetRepository.deleteById(setId);
    }


    public Optional<QuizSetEntity> getSetByShareCode(String shareCode) {
      return   quizSetRepository.findByShareCode(shareCode);
    }

    public void updateLastTimeUsed(Integer setId) {
        QuizSetEntity setEntity = quizSetRepository.findById(setId).get();
        setEntity.setLastTimeUsed(LocalDate.now());
        quizSetRepository.save(setEntity);
    }
}
