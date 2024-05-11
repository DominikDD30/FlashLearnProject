CREATE TABLE _user
(
    user_id  SERIAL       NOT NULL,
    email    VARCHAR(64)  NOT NULL,
    password VARCHAR(256) NOT NULL,
    active BOOLEAN NOT NULL,
    PRIMARY KEY (user_id),
    unique(email)
);