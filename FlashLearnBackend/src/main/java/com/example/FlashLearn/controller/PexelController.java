package com.example.FlashLearn.controller;

import com.example.FlashLearn.dto.FlashcardsReqestDTO;
import com.example.FlashLearn.dto.FlashcardDTO;
import com.example.FlashLearn.service.PexelService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.FlashLearn.controller.PexelController.PEXEL;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping(PEXEL)
public class PexelController {

    public static final String PEXEL="/pexel";
    private PexelService pexelService;

    @PostMapping
    public List<FlashcardDTO>getPhotos(@RequestBody FlashcardsReqestDTO flashcards){
        return pexelService.findImagesForFlashcards(flashcards.getFlashcards(),flashcards.getLanguage());
    }
}
