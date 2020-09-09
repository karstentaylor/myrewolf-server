BEGIN;

TRUNCATE
"users",
"themes";

INSERT INTO "user" ("id", "email", "password", "user_type", "latest_theme")
VALUES
(1, "admin@admin.com", "Adminpass1!", "admin", "testTheme")
(
    2, "test@test.com", "Testuser1!", "user", "testTheme"
);

INSERT INTO "themes" ("id", "name", "object_hex", "background_hex")
VALUES
(1, "test_1", "test_hex", "testObject_hex_1", "testBackground_hex_1"),
(2, "test_2", "test_hex_2", "testObject_hex_2", "testBackground_hex_2");

COMMIT;