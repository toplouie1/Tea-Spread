\c tea_dev;

INSERT INTO users (username, password_hash) VALUES
('jdoe', 'password_hash_1'),
('asmith', 'password_hash_2'),
('bwhite', 'password_hash_3'),
('cjohnson', 'password_hash_4');

INSERT INTO profiles (user_id, email, first_name, last_name, role) VALUES
((SELECT user_id FROM users WHERE username = 'jdoe'), 'jdoe@example.com', 'John', 'Doe', 'student'),
((SELECT user_id FROM users WHERE username = 'asmith'), 'asmith@example.com', 'Alice', 'Smith', 'teacher'),
((SELECT user_id FROM users WHERE username = 'bwhite'), 'bwhite@example.com', 'Bob', 'White', 'student'),
((SELECT user_id FROM users WHERE username = 'cjohnson'), 'cjohnson@example.com', 'Carol', 'Johnson', 'teacher');

INSERT INTO classes (class_name, class_description, class_code, start_date, end_date, max_students) VALUES
('Math 101', 'Introduction to Mathematics', 'M101', '2024-09-01', '2024-12-15', 30),
('History 201', 'World History Overview', 'H201', '2024-09-01', '2024-12-15', 25),
('Biology 301', 'Advanced Biology Studies', 'B301', '2024-09-01', '2024-12-15', 20);

INSERT INTO class_participants (class_id, user_id, role, enrollment_date) VALUES
((SELECT class_id FROM classes WHERE class_code = 'M101'), (SELECT user_id FROM users WHERE username = 'jdoe'), 'student', CURRENT_TIMESTAMP),
((SELECT class_id FROM classes WHERE class_code = 'M101'), (SELECT user_id FROM users WHERE username = 'bwhite'), 'student', CURRENT_TIMESTAMP),
((SELECT class_id FROM classes WHERE class_code = 'H201'), (SELECT user_id FROM users WHERE username = 'jdoe'), 'student', CURRENT_TIMESTAMP),
((SELECT class_id FROM classes WHERE class_code = 'B301'), (SELECT user_id FROM users WHERE username = 'bwhite'), 'student', CURRENT_TIMESTAMP),
((SELECT class_id FROM classes WHERE class_code = 'M101'), (SELECT user_id FROM users WHERE username = 'asmith'), 'teacher', CURRENT_TIMESTAMP),
((SELECT class_id FROM classes WHERE class_code = 'H201'), (SELECT user_id FROM users WHERE username = 'cjohnson'), 'teacher', CURRENT_TIMESTAMP),
((SELECT class_id FROM classes WHERE class_code = 'B301'), (SELECT user_id FROM users WHERE username = 'cjohnson'), 'teacher', CURRENT_TIMESTAMP);

INSERT INTO assignments (class_id, title, description, due_date) VALUES
((SELECT class_id FROM classes WHERE class_code = 'M101'), 'Homework 1', 'Solve problems 1 to 10 from the textbook.', '2024-09-15 23:59:00'),
((SELECT class_id FROM classes WHERE class_code = 'H201'), 'Essay 1', 'Write an essay on the French Revolution.', '2024-09-20 23:59:00'),
((SELECT class_id FROM classes WHERE class_code = 'B301'), 'Lab Report', 'Submit your lab report on the plant growth experiment.', '2024-09-25 23:59:00');

INSERT INTO submissions (assignment_id, student_id, content, grade, feedback) VALUES
((SELECT assignment_id FROM assignments WHERE title = 'Homework 1'), (SELECT user_id FROM users WHERE username = 'jdoe'), 'Submission content for Homework 1', 95.00, 'Great job!'),
((SELECT assignment_id FROM assignments WHERE title = 'Homework 1'), (SELECT user_id FROM users WHERE username = 'bwhite'), 'Submission content for Homework 1', 88.00, 'Good effort.'),
((SELECT assignment_id FROM assignments WHERE title = 'Essay 1'), (SELECT user_id FROM users WHERE username = 'jdoe'), 'Submission content for Essay 1', NULL, NULL),
((SELECT assignment_id FROM assignments WHERE title = 'Lab Report'), (SELECT user_id FROM users WHERE username = 'bwhite'), 'Submission content for Lab Report', NULL, NULL);
