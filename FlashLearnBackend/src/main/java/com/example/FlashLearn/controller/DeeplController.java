package com.example.FlashLearn.controller;

import com.deepl.api.DeepLException;
import com.example.FlashLearn.dto.TranslateResponse;
import com.example.FlashLearn.infractructure.api.DeeplClient;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.example.FlashLearn.controller.DeeplController.DEEPL;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping(DEEPL)
public class DeeplController {
    public static final String DEEPL = "/deepl";

    private DeeplClient deeplService;

    @GetMapping("/translate")
    public TranslateResponse translateText(String text, String source, String target){
        try {
            String translated = deeplService.translate(text, source, target);
            return TranslateResponse.builder().text(translated).build();
        } catch (RuntimeException |DeepLException | InterruptedException e) {
            return new TranslateResponse();
        }
    }
}
