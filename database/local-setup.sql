CREATE DATABASE IF NOT EXISTS believa
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE believa;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  username VARCHAR(100) NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NULL,
  image TEXT NULL,
  provider VARCHAR(50) NOT NULL DEFAULT 'credentials',
  role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
  otp VARCHAR(10) NULL,
  otp_expiry DATETIME NULL,
  streak_count INT NOT NULL DEFAULT 0,
  last_visit DATETIME NULL,
  streak_history JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  UNIQUE KEY uq_users_username (username)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS books (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  image_url TEXT NULL,
  description TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_books_slug (slug)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS chapters (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  book_id BIGINT UNSIGNED NOT NULL,
  chapter_number INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  content LONGTEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_chapters_book_slug (book_id, slug),
  UNIQUE KEY uq_chapters_book_number (book_id, chapter_number),
  CONSTRAINT fk_chapters_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS quiz_questions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  book_id BIGINT UNSIGNED NOT NULL,
  chapter_id BIGINT UNSIGNED NULL,
  question TEXT NOT NULL,
  option_a VARCHAR(500) NOT NULL,
  option_b VARCHAR(500) NOT NULL,
  option_c VARCHAR(500) NOT NULL,
  option_d VARCHAR(500) NOT NULL,
  correct_answer CHAR(1) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_quiz_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  CONSTRAINT fk_quiz_chapter FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_chapter_progress (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  book_id BIGINT UNSIGNED NOT NULL,
  chapter_id BIGINT UNSIGNED NOT NULL,
  completed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_progress_user_chapter (user_id, chapter_id),
  CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_progress_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  CONSTRAINT fk_progress_chapter FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS saved_chapters (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  chapter_id BIGINT UNSIGNED NOT NULL,
  saved_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_saved_user_chapter (user_id, chapter_id),
  CONSTRAINT fk_saved_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_saved_chapter FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_jaap_stats (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  count INT NOT NULL DEFAULT 0,
  mala_count INT NOT NULL DEFAULT 0,
  japs_today INT NOT NULL DEFAULT 0,
  japs_week INT NOT NULL DEFAULT 0,
  japs_month INT NOT NULL DEFAULT 0,
  mantra_name VARCHAR(255) NOT NULL DEFAULT 'राम',
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_jaap_user (user_id),
  CONSTRAINT fk_jaap_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_chat_usage (
  user_id BIGINT UNSIGNED NOT NULL,
  messages_sent INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  CONSTRAINT fk_chat_usage_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS contact (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS feedback (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  experience ENUM('Very Bad', 'Bad', 'Okay', 'Good', 'Excellent') NOT NULL,
  comment TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS believa_ratings (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  rating TINYINT UNSIGNED NOT NULL,
  review_text TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT chk_rating_range CHECK (rating BETWEEN 1 AND 5)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS subscription_plans (
  id VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NULL,
  amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  currency CHAR(3) NOT NULL DEFAULT 'INR',
  interval_name VARCHAR(20) NOT NULL DEFAULT 'monthly',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_subscription_plan_name (name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_subscriptions (
  id VARCHAR(100) NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  plan_id VARCHAR(100) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'created',
  current_start DATETIME NULL,
  current_end DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_user_subscriptions_user_status (user_id, status),
  CONSTRAINT fk_subscriptions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_subscriptions_plan FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS subscription_payments_log (
  id VARCHAR(100) NOT NULL,
  subscription_id VARCHAR(100) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  status VARCHAR(30) NOT NULL,
  method VARCHAR(50) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_payment_subscription (subscription_id),
  CONSTRAINT fk_payment_subscription FOREIGN KEY (subscription_id) REFERENCES user_subscriptions(id) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO books (title, slug, image_url, description)
VALUES
  ('Bhagavad Gita', 'bhagavad-gita', '/images/bhagavat-gita.png', 'Timeless teachings on duty, devotion, and inner clarity.'),
  ('Ramayan', 'ramayan', '/images/ramayan.png', 'Stories and lessons on courage, service, and dharma.'),
  ('Mahabharat', 'mahabharat', '/images/mahabharat.png', 'Reflections on choices, responsibility, and the human journey.'),
  ('Daily Wisdom', 'daily-wisdom', '/images/default-scripture.png', 'Short reflections for a steady daily practice.')
ON DUPLICATE KEY UPDATE
  title = VALUES(title), image_url = VALUES(image_url), description = VALUES(description);

INSERT INTO chapters (book_id, chapter_number, title, slug, content)
SELECT id, 1, 'The Yoga of Arjuna''s Despondency', 'chapter-1', 'Arjuna pauses before the battle and faces the weight of his choices. This chapter begins the journey from confusion toward clarity.'
FROM books WHERE slug = 'bhagavad-gita'
ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content);

INSERT INTO chapters (book_id, chapter_number, title, slug, content)
SELECT id, 2, 'The Yoga of Knowledge', 'chapter-2', 'Krishna introduces the distinction between the enduring self and temporary circumstances, and teaches action without attachment to results.'
FROM books WHERE slug = 'bhagavad-gita'
ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content);

INSERT INTO chapters (book_id, chapter_number, title, slug, content)
SELECT id, 1, 'The Beginning of the Journey', 'chapter-1', 'A reflection on integrity, responsibility, and the first step toward living with purpose.'
FROM books WHERE slug = 'ramayan'
ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content);

INSERT INTO quiz_questions (book_id, chapter_id, question, option_a, option_b, option_c, option_d, correct_answer)
SELECT b.id, c.id, 'What does the Bhagavad Gita encourage us to do with our duty?', 'Avoid every challenge', 'Perform it without attachment to results', 'Wait for perfect certainty', 'Seek praise first', 'B'
FROM books b JOIN chapters c ON c.book_id = b.id
WHERE b.slug = 'bhagavad-gita' AND c.slug = 'chapter-2'
  AND NOT EXISTS (SELECT 1 FROM quiz_questions q WHERE q.book_id = b.id AND q.question = 'What does the Bhagavad Gita encourage us to do with our duty?');

INSERT INTO quiz_questions (book_id, chapter_id, question, option_a, option_b, option_c, option_d, correct_answer)
SELECT b.id, c.id, 'What is the first step in a meaningful spiritual practice?', 'Comparison', 'Awareness', 'Distraction', 'Impatience', 'B'
FROM books b JOIN chapters c ON c.book_id = b.id
WHERE b.slug = 'ramayan' AND c.slug = 'chapter-1'
  AND NOT EXISTS (SELECT 1 FROM quiz_questions q WHERE q.book_id = b.id AND q.question = 'What is the first step in a meaningful spiritual practice?');

INSERT INTO subscription_plans (id, name, description, amount, currency, interval_name)
VALUES
  ('free', 'Free', 'A simple beginning for daily practice.', 0, 'INR', 'monthly'),
  ('plan_T6dLjO91M2gldp', 'Bodh Pro', 'For daily learners.', 199, 'INR', 'monthly'),
  ('plan_T6dNhCFLRPNSHX', 'Bodh Family', 'For the whole family.', 499, 'INR', 'monthly'),
  ('plan_T6dOTYnE6Wuizf', 'Bodh Plus', 'For deep seekers.', 799, 'INR', 'monthly')
ON DUPLICATE KEY UPDATE
  name = VALUES(name), description = VALUES(description), amount = VALUES(amount);
