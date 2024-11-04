package com.example.FlashLearn.infractructure.database.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@With
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"flashcardId","concept","definition"})
@ToString(of = {"flashcardId","concept","definition"})
@Entity
@Table(name = "flashcard")
public class FlashcardEntity {

    @Id
    @Column(name = "flashcard_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer flashcardId;

    @Column(name = "concept")
    private String concept;

    @Column(name = "definition")
    private String definition;

    @Column(name = "image_path")
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "flashcards_set_id")
    private FlashcardsSetEntity flashcardsSet;
}
