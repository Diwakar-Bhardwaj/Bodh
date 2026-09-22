INSERT INTO quiz_questions (book_id, chapter_id, question, option_a, option_b, option_c, option_d, correct_answer)
SELECT b.id, c.id, 'Why does Arjuna feel confused at the beginning of the Gita?', 'He has lost his weapons', 'He must face loved ones in battle', 'He cannot find Krishna', 'He wants to leave the kingdom', 'B'
FROM books b JOIN chapters c ON c.book_id = b.id
WHERE b.slug = 'bhagavad-gita' AND c.slug = 'chapter-1'
  AND NOT EXISTS (SELECT 1 FROM quiz_questions q WHERE q.question = 'Why does Arjuna feel confused at the beginning of the Gita?');

INSERT INTO quiz_questions (book_id, chapter_id, question, option_a, option_b, option_c, option_d, correct_answer)
SELECT b.id, c.id, 'What does Arjuna lower before asking Krishna for guidance?', 'His crown', 'His bow and arrows', 'His shield', 'His flag', 'B'
FROM books b JOIN chapters c ON c.book_id = b.id
WHERE b.slug = 'bhagavad-gita' AND c.slug = 'chapter-1'
  AND NOT EXISTS (SELECT 1 FROM quiz_questions q WHERE q.question = 'What does Arjuna lower before asking Krishna for guidance?');

INSERT INTO quiz_questions (book_id, chapter_id, question, option_a, option_b, option_c, option_d, correct_answer)
SELECT b.id, c.id, 'What is Arjuna asking for when he turns to Krishna?', 'A larger army', 'A new kingdom', 'Clarity and direction', 'A promise of victory', 'C'
FROM books b JOIN chapters c ON c.book_id = b.id
WHERE b.slug = 'bhagavad-gita' AND c.slug = 'chapter-1'
  AND NOT EXISTS (SELECT 1 FROM quiz_questions q WHERE q.question = 'What is Arjuna asking for when he turns to Krishna?');

INSERT INTO quiz_questions (book_id, chapter_id, question, option_a, option_b, option_c, option_d, correct_answer)
SELECT b.id, c.id, 'According to Krishna, what is never destroyed?', 'The body', 'The eternal self', 'Material wealth', 'Fame', 'B'
FROM books b JOIN chapters c ON c.book_id = b.id
WHERE b.slug = 'bhagavad-gita' AND c.slug = 'chapter-2'
  AND NOT EXISTS (SELECT 1 FROM quiz_questions q WHERE q.question = 'According to Krishna, what is never destroyed?');

INSERT INTO quiz_questions (book_id, chapter_id, question, option_a, option_b, option_c, option_d, correct_answer)
SELECT b.id, c.id, 'What kind of action does Krishna encourage?', 'Action without attachment to results', 'Action only for praise', 'Action based on fear', 'Action that avoids responsibility', 'A'
FROM books b JOIN chapters c ON c.book_id = b.id
WHERE b.slug = 'bhagavad-gita' AND c.slug = 'chapter-2'
  AND NOT EXISTS (SELECT 1 FROM quiz_questions q WHERE q.question = 'What kind of action does Krishna encourage?');

INSERT INTO quiz_questions (book_id, chapter_id, question, option_a, option_b, option_c, option_d, correct_answer)
SELECT b.id, c.id, 'What does equanimity mean in the teaching of Chapter 2?', 'Always getting what we want', 'Remaining steady in success and difficulty', 'Avoiding every decision', 'Ignoring other people', 'B'
FROM books b JOIN chapters c ON c.book_id = b.id
WHERE b.slug = 'bhagavad-gita' AND c.slug = 'chapter-2'
  AND NOT EXISTS (SELECT 1 FROM quiz_questions q WHERE q.question = 'What does equanimity mean in the teaching of Chapter 2?');

INSERT INTO quiz_questions (book_id, chapter_id, question, option_a, option_b, option_c, option_d, correct_answer)
SELECT b.id, c.id, 'What quality is associated with Rama in the Ramayan?', 'Integrity and duty', 'Greed and deception', 'Indifference', 'Carelessness', 'A'
FROM books b JOIN chapters c ON c.book_id = b.id
WHERE b.slug = 'ramayan' AND c.slug = 'chapter-1'
  AND NOT EXISTS (SELECT 1 FROM quiz_questions q WHERE q.question = 'What quality is associated with Rama in the Ramayan?');

INSERT INTO quiz_questions (book_id, chapter_id, question, option_a, option_b, option_c, option_d, correct_answer)
SELECT b.id, c.id, 'What does dharma refer to in these teachings?', 'A temporary mood', 'A person''s responsibility and right conduct', 'A type of weapon', 'A royal celebration', 'B'
FROM books b JOIN chapters c ON c.book_id = b.id
WHERE b.slug = 'ramayan' AND c.slug = 'chapter-1'
  AND NOT EXISTS (SELECT 1 FROM quiz_questions q WHERE q.question = 'What does dharma refer to in these teachings?');

INSERT INTO quiz_questions (book_id, chapter_id, question, option_a, option_b, option_c, option_d, correct_answer)
SELECT b.id, c.id, 'What can a spiritual story help us reflect on?', 'Only ancient dates', 'Our choices and responsibilities', 'How to avoid learning', 'Why kindness is unnecessary', 'B'
FROM books b JOIN chapters c ON c.book_id = b.id
WHERE b.slug = 'ramayan' AND c.slug = 'chapter-1'
  AND NOT EXISTS (SELECT 1 FROM quiz_questions q WHERE q.question = 'What can a spiritual story help us reflect on?');
