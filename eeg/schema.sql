DROP TABLE if EXISTS datasets;

CREATE TABLE datasets (
    'id'          INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    'output'      INTEGER NOT NULL,
    'emotion'     CHAR(64) NOT NULL,
    'timestamp'   TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO datasets ('output', 'emotion') VALUES (0, 'Happy');
INSERT INTO datasets ('output', 'emotion') VALUES (1, 'Neutral');
INSERT INTO datasets ('output', 'emotion') VALUES (2, 'Calm');
