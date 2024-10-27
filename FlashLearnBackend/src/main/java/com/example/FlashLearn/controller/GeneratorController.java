package com.example.FlashLearn.controller;

import com.example.FlashLearn.dto.AnswerDTO;
import com.example.FlashLearn.dto.FlashcardDTO;
import com.example.FlashLearn.dto.QuestionDTO;
import com.example.FlashLearn.service.generating.FlashcardsGeneratingService;
import com.example.FlashLearn.service.generating.OcrService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import static com.example.FlashLearn.controller.GeneratorController.GENERATOR;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping(GENERATOR)
public class GeneratorController {
    public static final String GENERATOR = "/generate";
    private OcrService ocrService;
    private FlashcardsGeneratingService flashcardsGeneratingService;

    @PostMapping("/ocr")
    public String doOcr(@RequestParam("file")MultipartFile file){
        if (file.isEmpty()) return "";
        return ocrService.ocrFile(file);
    }



    @GetMapping("/flashcard")
    public List<FlashcardDTO>generateFlashcards(@RequestParam("text")String text,
                                                @RequestParam("xSep")String xSep,@RequestParam("ySep")String ySep){
       return flashcardsGeneratingService.generate(text,xSep,ySep);
    }

    @PostMapping("/quiz")
    public List<QuestionDTO> generateQuizzes(@RequestParam("file") MultipartFile file){
        if (file.isEmpty()) {
            return List.of();
        }
        try {
            Map<String, List<AnswerDTO>> map = ocrService.ocrImageAndCreateQuizItems(file);
            AtomicInteger counter= new AtomicInteger(1);
            return map.entrySet().stream().map(entry->new QuestionDTO(counter.getAndIncrement(),entry.getKey(),entry.getValue())).toList();
        } catch (IOException e) {
            return List.of();
        }

    }
}
