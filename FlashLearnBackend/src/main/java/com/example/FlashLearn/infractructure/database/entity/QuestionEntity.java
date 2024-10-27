package com.example.FlashLearn.infractructure.database.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@With
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"questionId","question"})
@ToString(of = {"questionId","question"})
@Entity
@Table(name = "question")
public class QuestionEntity {

    @Id
    @Column(name = "question_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer questionId;

    @Column(name = "question")
    private String question;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<AnswerEntity> answers;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private QuizEntity quiz;
}
