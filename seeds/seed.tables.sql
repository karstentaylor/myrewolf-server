BEGIN;

TRUNCATE
users,
answers,
discovery;

INSERT INTO users (id, email, name, password, admin)
VALUES
(1, 'admin@admin.com', 'admin', '$2a$12$w979U3RD5MEnDEsGxtCOc.aEDQU3QcGCtAUy8SbC.esh2EGwbRYT6', true),
(2, 'test@test.com', 'test', '$2a$12$whPTDc.7uyqiSm4VqCSYtOeigOZHBVXvssZY2zHFy9jdXMsuwq7/6', false);

-- Admin pass: Adminpass1!
-- Test pass: Testuser1!

INSERT INTO "discovery" ("id", "question")
VALUES
(1, 'What works and what hasn’t in the past with social / how would you like your feed to evolve?'),
(2, 'How would you define success for each social media channel?'),
(3, 'What would you like to see more of on your feed?'),
(4, 'Are there any other brands or accounts that inspire you?'),
(5, 'How do you want to be seen? How do you want people to view / look up to you?'),
(6, 'Who do you see are your direct competitors? What do you feel sets you apart from them?'),
(7, 'Who is your target audience? Who do you relate to, who do you wish to speak to the most?');


COMMIT;