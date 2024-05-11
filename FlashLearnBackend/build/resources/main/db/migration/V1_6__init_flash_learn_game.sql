CREATE TABLE game
(
    game_id              SERIAL      NOT NULL,
    set_id               INT         NOT NULL,
    pairs                INT         NOT NULL,
    join_code            VARCHAR(64),
    active               BOOLEAN     NOT NULL,
    player_id            VARCHAR(64) NOT NULL,
    player_points        INT         NOT NULL,
    second_player_id     VARCHAR(64),
    second_player_points INT         NOT NULL,
    second_player_name   VARCHAR(64),
    PRIMARY KEY (game_id)
);