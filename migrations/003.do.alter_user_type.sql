DROP TYPE IF EXISTS "user_type";
CREATE TYPE "user_type" AS ENUM (
    'admin',
    'user'
);

ALTER TABLE "users"
    ADD COLUMN
    "account" "user_type";