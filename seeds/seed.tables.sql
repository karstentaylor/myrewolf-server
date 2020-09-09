BEGIN;

TRUNCATE
"users";

INSERT INTO "users" ("id", "email", "name", "password", "admin")
VALUES
(1, 'admin@admin.com', 'admin', 'Adminpass1!', true),
(2, 'test@test.com', 'test', 'Testuser1!', false);

COMMIT;