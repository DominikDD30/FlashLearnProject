CREATE TABLE quiz
(
    quiz_id     SERIAL       NOT NULL,
    quiz_set_id INT          NOT NULL,
    question    VARCHAR(256) NOT NULL,
    PRIMARY KEY (quiz_id),
    CONSTRAINT fk_quiz_quiz_set
        FOREIGN KEY (quiz_set_id)
            REFERENCES quiz_set (quiz_set_id)
);