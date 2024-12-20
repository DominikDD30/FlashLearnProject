CREATE TABLE quiz
(
    quiz_id    SERIAL       NOT NULL,
    owner_id       INT          NOT NULL,
    name           VARCHAR(128) NOT NULL,
    last_time_used DATE         NOT NULL,
    share_code     VARCHAR(128) NOT NULL,
    PRIMARY KEY (quiz_id),
    CONSTRAINT fk_quiz_owner
        FOREIGN KEY (owner_id)
            REFERENCES _user (user_id)
);