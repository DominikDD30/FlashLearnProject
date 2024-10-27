package com.example.FlashLearn.infractructure.database.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@With
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"quizId","name"})
@ToString(of = {"quizId","name","lastTimeUsed"})
@Entity
@Table(name = "quiz")
public class QuizEntity {

    @Id
    @Column(name = "quiz_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer quizId;

    @Column(name = "name")
    private String name;

    @Column(name = "last_time_used")
    private LocalDate lastTimeUsed;

    @Column(name = "share_code")
    private String shareCode;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private UserEntity user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "quiz", cascade = CascadeType.REMOVE)
    private Set<QuestionEntity> questions;
}
