package com.example.FlashLearn.service;

import com.example.FlashLearn.dto.FlashcardsSetDTO;
import com.example.FlashLearn.infractructure.database.entity.FlashcardEntity;
import com.example.FlashLearn.infractructure.database.entity.FlashcardsSetEntity;
import com.example.FlashLearn.infractructure.database.repository.FlashcardRepository;
import com.example.FlashLearn.infractructure.database.repository.FlashcardsSetRepository;
import com.example.FlashLearn.infractructure.mapper.FlashcardMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FlashcardService {

    private FlashcardsSetRepository flashcardsSetRepository;
    private FlashcardRepository flashcardRepository;
    private UserService userService;


    public void saveSet(FlashcardsSetEntity flashcardsSetEntity) {
        flashcardsSetRepository.save(flashcardsSetEntity);
    }
    @Transactional
    public void saveSet(FlashcardsSetDTO flashcardsSetDTO) {
        FlashcardsSetEntity flashcardsSet = FlashcardsSetEntity.builder()
                .name(flashcardsSetDTO.getSetName())
                .lastTimeUsed(LocalDate.now())
                .shareCode(UUID.randomUUID().toString())
                .owner(userService.findUserById(flashcardsSetDTO.getOwnerId()))
                .build();
        flashcardsSetRepository.save(flashcardsSet);
        flashcardRepository.saveAll(flashcardsSetDTO.getFlashcards().stream()
                .map(flashcardDTO -> FlashcardMapper.mapToEntity(flashcardDTO).withFlashcardId(null))
                .peek(flashcard -> flashcard.setFlashcardsSet(flashcardsSet))
                .collect(Collectors.toSet()));
    }




    public Map<String, List<FlashcardsSetDTO>> getSetsForUser(Integer userId) {
        List<FlashcardsSetDTO> flashcardsSets = flashcardsSetRepository.getAllByOwner_UserId(userId).orElse(List.of())
                .stream().map(flashcardsSetEntity -> FlashcardsSetDTO.builder()
                        .id(flashcardsSetEntity.getFlashcardsSetId())
                        .setName(flashcardsSetEntity.getName())
                        .shareCode(flashcardsSetEntity.getShareCode())
                        .lastTimeUsed(flashcardsSetEntity.getLastTimeUsed())
                        .flashcardsAmount(flashcardsSetEntity.getFlashcards().size())
                        .build())
                .toList();
        return groupByDateCategory(flashcardsSets);
    }

    private Map<String, List<FlashcardsSetDTO>> groupByDateCategory(List<FlashcardsSetDTO> flashcardsSets) {
        Map<String, List<FlashcardsSetDTO>> groupedSets = new LinkedHashMap<>();

        // today
        LocalDate today = LocalDate.now();
        List<FlashcardsSetDTO> todaySets = flashcardsSets.stream()
                .filter(set -> set.getLastTimeUsed().isEqual(today)).toList();
        groupedSets.put("today", todaySets);

        // this week
        LocalDate thisWeekStart = LocalDate.now().minusWeeks(1);
        List<FlashcardsSetDTO> thisWeekSets = flashcardsSets.stream()
                .filter(set -> set.getLastTimeUsed().isAfter(thisWeekStart.minusDays(1))&&set.getLastTimeUsed().isBefore(today)).toList();
        groupedSets.put("thisWeek", thisWeekSets);

        // previous week
        LocalDate prevWeekStart = thisWeekStart.minusWeeks(1);
        List<FlashcardsSetDTO> prevWeekSets = flashcardsSets.stream()
                .filter(set -> set.getLastTimeUsed().isAfter(prevWeekStart.minusDays(1))&&set.getLastTimeUsed().isBefore(thisWeekStart)).toList();
        groupedSets.put("pastWeek", prevWeekSets);

        Map<String, List<FlashcardsSetDTO>> rest = flashcardsSets.stream()
                .filter(set ->set.getLastTimeUsed().isBefore(prevWeekStart.minusDays(1)))
                .sorted(Comparator.comparing(FlashcardsSetDTO::getLastTimeUsed).reversed())
                .collect(Collectors.groupingBy(
                        set -> set.getLastTimeUsed().format(DateTimeFormatter.ofPattern("yyyy-MM")),
                        LinkedHashMap::new,
                        Collectors.toList()
                ));;

        groupedSets.putAll(rest);

        return groupedSets;
    }

    public FlashcardsSetEntity getSetById(Integer setId) {
        return flashcardsSetRepository.findById(setId).get();
    }

    public void deleteSet(Integer setId) {
        flashcardsSetRepository.deleteById(setId);
    }

    public Optional<FlashcardsSetEntity> getSetByShareCode(String shareCode) {
        return flashcardsSetRepository.findByShareCode(shareCode);
    }

    public void deleteFlashcard(FlashcardEntity flashcardEntity) {
        flashcardRepository.delete(flashcardEntity);
    }

    public void updateLastTimeUsed(Integer setId) {
        FlashcardsSetEntity setEntity = flashcardsSetRepository.findById(setId).get();
        setEntity.setLastTimeUsed(LocalDate.now());
        flashcardsSetRepository.save(setEntity);
    }
}
