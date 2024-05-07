package com.example.FlashLearn.infractructure.api;

import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@AllArgsConstructor
public class ElevenLabApiClientImpl {

    private final WebClient elevenLabWebClient;

    public byte[] saveMPEGForFlashcard(String flashcard) {
        try {
            int similarityBoost = 1;
            int stability = 1;
            String modelId = "eleven_monolingual_v1";

            TextToSpeechRequest request = new TextToSpeechRequest(flashcard, new VoiceSettings(similarityBoost, stability), modelId);
            return elevenLabWebClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .path("/text-to-speech/21m00Tcm4TlvDq8ikWAM")
                            .build())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(request))
                    .retrieve()
                    .bodyToMono(byte[].class)
                    .block();
        } catch (Exception e) {
            return null;
        }
    }


    static class TextToSpeechRequest {
        private String text;
        private VoiceSettings voiceSettings;
        private String modelId;

        public TextToSpeechRequest(String text, VoiceSettings voiceSettings, String modelId) {
            this.text = text;
            this.voiceSettings = voiceSettings;
            this.modelId = modelId;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public VoiceSettings getVoiceSettings() {
            return voiceSettings;
        }

        public void setVoiceSettings(VoiceSettings voiceSettings) {
            this.voiceSettings = voiceSettings;
        }

        public String getModelId() {
            return modelId;
        }

        public void setModelId(String modelId) {
            this.modelId = modelId;
        }
    }

    static class VoiceSettings {
        private int similarityBoost;
        private int stability;

        public VoiceSettings(int similarityBoost, int stability) {
            this.similarityBoost = similarityBoost;
            this.stability = stability;
        }

        public int getSimilarityBoost() {
            return similarityBoost;
        }

        public void setSimilarityBoost(int similarityBoost) {
            this.similarityBoost = similarityBoost;
        }

        public int getStability() {
            return stability;
        }

        public void setStability(int stability) {
            this.stability = stability;
        }
        // Gettery i settery
        // Konstruktory
    }
}
