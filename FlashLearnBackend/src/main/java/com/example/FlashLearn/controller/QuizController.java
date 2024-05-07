package com.example.FlashLearn.controller;

import com.example.FlashLearn.dto.*;
import com.example.FlashLearn.infractructure.database.entity.QuizSetEntity;
import com.example.FlashLearn.infractructure.mapper.QuizMapper;
import com.example.FlashLearn.service.ocr.OcrService;
import com.example.FlashLearn.service.QuizService;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import static com.example.FlashLearn.controller.QuizController.QUIZ;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping(QUIZ)
public class QuizController {

    public static final String QUIZ="/quiz";
    private QuizService quizService;
    private OcrService ocrService;

    @PostMapping
    public void saveSet(@RequestBody QuizSetDTO quiz){
         quizService.saveSet(quiz);
    }

    @PutMapping("/{setId}")
    @Transactional
    public void updateSet(@PathVariable Integer setId,@RequestBody QuizSetDTO updatedSet){
        quizService.deleteSet(setId);
        quizService.saveSet(updatedSet);
    }

    @DeleteMapping("/{setId}")
    public void deleteSet(@PathVariable Integer setId){
        quizService.deleteSet(setId);
    }
    @GetMapping("/user/{userId}")
    public List<QuizSetDTO> getSetsForUser(@PathVariable Integer userId){
        return quizService.getSetsForUser(userId).stream()
                .map(quizSetEntity-> new QuizSetDTO(
                        quizSetEntity.getQuizSetId(),
                        0,
                        quizSetEntity.getName(),
                        quizSetEntity.getShareCode(),
                        quizSetEntity.getQuizItems().stream().map(QuizMapper::mapFromEntity).toList(),
                        quizSetEntity.getQuizItems().size()))
                .toList();
    }

    @PatchMapping("/{setId}/updateLastTimeUsed")
    public void updateLastTimeUsed(@PathVariable Integer setId){
        quizService.updateLastTimeUsed(setId);
    }

    @PostMapping("/ocr")
    public List<QuizDTO> ocrPdf(@RequestParam("file") MultipartFile file){
        if (file.isEmpty()) {
            return List.of();
        }
        try {
            Map<String, List<AnswerDTO>> map = ocrService.ocrImageAndCreateQuizItems(file);
            AtomicInteger counter= new AtomicInteger(1);
           return map.entrySet().stream().map(entry->new QuizDTO(counter.getAndIncrement(),entry.getKey(),entry.getValue())).toList();
        } catch (IOException e) {
            return List.of();
        }

    }
}
