package com.example.FlashLearn.service;

import com.example.FlashLearn.dto.FlashcardDTO;
import com.example.FlashLearn.infractructure.api.PexelApiClientImpl;
import com.example.FlashLearn.infractructure.api.PexelPhotosResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PexelService {

    private PexelApiClientImpl pexelApiClient;

    public List<FlashcardDTO> findImagesForFlashcards(List<String> flashcards,String language) {
        return flashcards.stream()
                .map(flashcard -> {
                    PexelPhotosResponse pexelPhotos = pexelApiClient.findImageForflashcard(flashcard,language);
                   return FlashcardDTO.builder()
                        .concept(flashcard)
                        .image(pexelPhotos.getPhotos().get(0).getSrc().tiny())
                        .build();
                }).toList();
    }
}
