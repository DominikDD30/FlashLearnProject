package com.example.FlashLearn.controller;

import com.example.FlashLearn.dto.*;
import com.example.FlashLearn.infractructure.mapper.QuizMapper;
import com.example.FlashLearn.service.generating.OcrService;
import com.example.FlashLearn.service.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.FlashLearn.controller.QuizController.QUIZ;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping(QUIZ)
public class QuizController {

    public static final String QUIZ="/quiz";
    private QuizService quizService;

    @PostMapping
    public void saveSet(@RequestBody QuizDTO quiz){
         quizService.saveSet(quiz);
    }

    @PutMapping("/{setId}")
    @Transactional
    public void updateSet(@PathVariable Integer setId,@RequestBody QuizDTO updatedSet){
        quizService.deleteSet(setId);
        quizService.saveSet(updatedSet);
    }

    @DeleteMapping("/{setId}")
    public void deleteSet(@PathVariable Integer setId){
        quizService.deleteSet(setId);
    }
    @GetMapping("/user/{userId}")
    public List<QuizDTO> getSetsForUser(@PathVariable Integer userId){
        return quizService.getSetsForUser(userId).stream()
                .map(quizSetEntity-> new QuizDTO(
                        quizSetEntity.getQuizId(),
                        0,
                        quizSetEntity.getName(),
                        quizSetEntity.getShareCode(),
                        quizSetEntity.getQuestions().stream().map(QuizMapper::mapFromEntity).toList(),
                        quizSetEntity.getQuestions().size()))
                .toList();
    }

    @PatchMapping("/{setId}/updateLastTimeUsed")
    public void updateLastTimeUsed(@PathVariable Integer setId){
        quizService.updateLastTimeUsed(setId);
    }


}
