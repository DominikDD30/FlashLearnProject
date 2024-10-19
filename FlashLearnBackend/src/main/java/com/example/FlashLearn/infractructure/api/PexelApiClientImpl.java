package com.example.FlashLearn.infractructure.api;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@AllArgsConstructor
public class PexelApiClientImpl{

    private final WebClient pexelWebClient;

    public PexelPhotosResponse findImageForflashcard(String flashcard, String language) {
        try {
            return pexelWebClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/search")
                            .queryParam("per_page",1)
                            .queryParam("query",flashcard)
                            .queryParam("locale",language)
                            .build())
                    .retrieve()
                    .bodyToMono(PexelPhotosResponse.class)
                    .block();
        } catch (Exception e) {
            return PexelPhotosResponse.builder().build();
        }
    }
}
