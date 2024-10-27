CREATE TABLE answer
(
    answer_id SERIAL       NOT NULL,
    question_id    INT          NOT NULL,
    value      VARCHAR(256) NOT NULL,
    is_correct BOOLEAN      NOT NULL,
    PRIMARY KEY (answer_id),
    CONSTRAINT fk_answer_question
        FOREIGN KEY (question_id)
            REFERENCES question (question_id)
);