CREATE TABLE answer
(
    answer_id SERIAL       NOT NULL,
    quiz_id    INT          NOT NULL,
    value      VARCHAR(256) NOT NULL,
    is_correct BOOLEAN      NOT NULL,
    PRIMARY KEY (answer_id),
    CONSTRAINT fk_answer_quiz
        FOREIGN KEY (quiz_id)
            REFERENCES quiz (quiz_id)
);