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
@EqualsAndHashCode(of = {"quizSetId","name"})
@ToString(of = {"quizSetId","name","lastTimeUsed"})
@Entity
@Table(name = "quiz_set")
public class QuizSetEntity {

    @Id
    @Column(name = "quiz_set_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer quizSetId;

    @Column(name = "name")
    private String name;

    @Column(name = "last_time_used")
    private LocalDate lastTimeUsed;

    @Column(name = "share_code")
    private String shareCode;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private UserEntity user;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "quizSet", cascade = CascadeType.REMOVE)
    private Set<QuizEntity> quizItems;
}
