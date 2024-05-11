CREATE TABLE flashcard
(
    flashcard_id      SERIAL       NOT NULL,
    flashcards_set_id INT          NOT NULL,
    concept           VARCHAR(256) NOT NULL,
    definition        VARCHAR(256) NOT NULL,
    image_path        VARCHAR(256),
    PRIMARY KEY (flashcard_id),
    CONSTRAINT fk_flashcard_flashcards_set
        FOREIGN KEY (flashcards_set_id)
            REFERENCES flashcards_set (flashcards_set_id)
);