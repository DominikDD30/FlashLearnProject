package com.example.FlashLearn.controller;


import com.example.FlashLearn.dto.FlashcardDTO;
import com.example.FlashLearn.dto.FlashcardSetGroupedByDate;
import com.example.FlashLearn.dto.FlashcardsSetDTO;
import com.example.FlashLearn.infractructure.database.entity.FlashcardsSetEntity;
import com.example.FlashLearn.infractructure.mapper.FlashcardMapper;
import com.example.FlashLearn.infractructure.mapper.FlashcardSetMapper;
import com.example.FlashLearn.service.FlashcardService;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.FlashLearn.controller.FlashcardController.FLASHCARDS;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping(FLASHCARDS)
public class FlashcardController {

     public static final String FLASHCARDS = "/flashcards";
    private final FlashcardService flashcardService;



    @PostMapping
    public void saveSet(@RequestBody FlashcardsSetDTO flashcards){
         flashcardService.saveSet(flashcards);
    }

    @GetMapping("/user/{userId}")
    public List<FlashcardSetGroupedByDate> getFlashcardSetsForUser(@PathVariable Integer userId){
        return flashcardService.getSetsForUser(userId).entrySet().stream()
                .map(entrySet-> new FlashcardSetGroupedByDate(entrySet.getKey(), entrySet.getValue())).toList();
    }

    @PutMapping("/{setId}")
    @Transactional
    public void updateSet(@PathVariable Integer setId,@RequestBody FlashcardsSetDTO updatedSet){
        FlashcardsSetEntity setEntity = flashcardService.getSetById(setId);
        setEntity.getFlashcards().forEach(flashcardService::deleteFlashcard);
        setEntity.setFlashcards(updatedSet.getFlashcards().stream()
                .map(FlashcardMapper::mapToEntity)
                .peek(flashcard->flashcard.setFlashcardsSet(setEntity))
                .collect(Collectors.toSet()));
        setEntity.setName(updatedSet.getSetName());
        setEntity.setLastTimeUsed(LocalDate.now());

        flashcardService.saveSet(setEntity);
    }

    @PatchMapping("/{setId}/updateLastTimeUsed")
    public void updateLastTimeUsed(@PathVariable Integer setId){
        flashcardService.updateLastTimeUsed(setId);
    }

    @DeleteMapping("/{setId}")
    public void deleteSet(@PathVariable Integer setId){
        flashcardService.deleteSet(setId);
    }

    @GetMapping("/{setId}")
    public FlashcardsSetDTO getFlashcardsSet(@PathVariable Integer setId){
        FlashcardsSetEntity setEntity = flashcardService.getSetById(setId);
        return FlashcardSetMapper.mapFromEntity(setEntity);
    }


    @GetMapping("/sound/{concept}")
    public String getSoundAsBase64(@PathVariable String concept) {
        Path mpegFolder;
        try {
            mpegFolder = Paths.get(Objects.requireNonNull(getClass().getClassLoader().getResource("mpeg_files/")).toURI());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        Path filePath = mpegFolder.resolve(concept+".mp3");

        if (Files.exists(filePath)) {
            try {
                byte[] audioBytes = Files.readAllBytes(filePath);
                return Base64.getEncoder().encodeToString(audioBytes);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } else {
            throw new RuntimeException("Audio file not found");
        }
    }







}
