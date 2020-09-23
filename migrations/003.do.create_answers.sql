CREATE TABLE answers (
    "id" SERIAL PRIMARY KEY,
    "answer" TEXT NOT NULL,
    "user_id" INTEGER REFERENCES "users"(id) ON DELETE CASCADE,
    "date_added" TIMESTAMPTZ DEFAULT now() NOT NULL
);