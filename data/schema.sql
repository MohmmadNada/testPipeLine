DROP TABLE IF EXISTS tableOne;
CREATE TABLE IF NOT EXISTS tableOne(
    id SERIAL PRIMARY KEY NOT NULL,
    quote TEXT NOT NULL,
character VARCHAR(256) NOT NULL,
image TEXT NOT NULL,
characterDirection VARCHAR(256) NOT NULL
);
