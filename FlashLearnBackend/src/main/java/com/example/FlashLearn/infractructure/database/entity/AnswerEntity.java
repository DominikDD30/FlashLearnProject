package com.example.FlashLearn.infractructure.database.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"answerId","value"})
@ToString(of = {"answerId","value","isCorrect"})
@Entity
@Table(name = "answer")
public class AnswerEntity {

    @Id
    @Column(name = "answer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer answerId;

    @Column(name = "value")
    private String value;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private QuizEntity quiz;
}
