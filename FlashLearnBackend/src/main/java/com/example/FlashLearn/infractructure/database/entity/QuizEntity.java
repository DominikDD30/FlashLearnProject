package com.example.FlashLearn.infractructure.database.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@With
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"quizId","question"})
@ToString(of = {"quizId","question"})
@Entity
@Table(name = "quiz")
public class QuizEntity {

    @Id
    @Column(name = "quiz_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer quizId;

    @Column(name = "question")
    private String question;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "quiz", cascade = CascadeType.REMOVE)
    private List<AnswerEntity> answers;

    @ManyToOne
    @JoinColumn(name = "quiz_set_id")
    private QuizSetEntity quizSet;
}
