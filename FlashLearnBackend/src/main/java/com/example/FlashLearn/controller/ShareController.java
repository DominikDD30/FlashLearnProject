package com.example.FlashLearn.controller;

import com.example.FlashLearn.dto.FlashcardsSetDTO;
import com.example.FlashLearn.dto.QuizSetDTO;
import com.example.FlashLearn.dto.SharedSetDTO;
import com.example.FlashLearn.infractructure.database.entity.FlashcardsSetEntity;
import com.example.FlashLearn.infractructure.database.entity.QuizSetEntity;
import com.example.FlashLearn.infractructure.mapper.FlashcardMapper;
import com.example.FlashLearn.infractructure.mapper.QuizMapper;
import com.example.FlashLearn.service.FlashcardService;
import com.example.FlashLearn.service.QuizService;
import com.example.FlashLearn.service.SharingService;
import com.example.FlashLearn.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static com.example.FlashLearn.controller.ShareController.SHARE;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping(SHARE)
public class ShareController {

    public static final String SHARE="/share";
    private QuizService quizService;
    private FlashcardService flashcardService;
    private SharingService sharingService;

    @GetMapping("/{shareCode}")
    public SharedSetDTO findSetByShareCode(@PathVariable String shareCode) {
        Optional<FlashcardsSetEntity> flashcardsSetEntity = flashcardService.getSetByShareCode(shareCode);

        return flashcardsSetEntity.isPresent() ?
                sharingService.buildFlashcardsSetDto(flashcardsSetEntity.get())
                : sharingService.buildQuizSetDto(quizService.getSetByShareCode(shareCode).get());
    }




}
