CREATE TABLE question
(
    question_id     SERIAL       NOT NULL,
    quiz_id INT          NOT NULL,
    question    VARCHAR(256) NOT NULL,
    PRIMARY KEY (question_id),
    CONSTRAINT fk_question_quiz
        FOREIGN KEY (quiz_id)
            REFERENCES quiz (quiz_id)
);