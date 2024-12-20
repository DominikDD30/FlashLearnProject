CREATE TABLE flashcards_set
(
    flashcards_set_id SERIAL       NOT NULL,
    owner_id          INT          NOT NULL,
    name              VARCHAR(128) NOT NULL,
    last_time_used    DATE         NOT NULL,
    share_code        VARCHAR(128) NOT NULL,
    PRIMARY KEY (flashcards_set_id),
    CONSTRAINT fk_flashcards_set_user
        FOREIGN KEY (owner_id)
            REFERENCES _user (user_id)
);