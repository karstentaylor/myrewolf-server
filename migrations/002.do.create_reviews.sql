CREATE TABLE reviews (
    "id" SERIAL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "date_created" TIMESTAMPTZ DEFAULT now() NOT NULL
);