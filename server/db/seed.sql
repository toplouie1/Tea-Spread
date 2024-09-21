\c tea_dev;

INSERT INTO users (username, password_hash) VALUES
('jdoe', 'password_hash_1'),
('asmith', 'password_hash_2'),
('bwhite', 'password_hash_3'),
('cjohnson', 'password_hash_4'),
('dgreen', 'password_hash_5'),  
('emartin', 'password_hash_6');

INSERT INTO profiles (user_id, email, first_name, last_name, role) VALUES
((SELECT user_id FROM users WHERE username = 'jdoe'), 'jdoe@example.com', 'John', 'Doe', 'student'),
((SELECT user_id FROM users WHERE username = 'asmith'), 'asmith@example.com', 'Alice', 'Smith', 'teacher'),
((SELECT user_id FROM users WHERE username = 'bwhite'), 'bwhite@example.com', 'Bob', 'White', 'student'),
((SELECT user_id FROM users WHERE username = 'cjohnson'), 'cjohnson@example.com', 'Carol', 'Johnson', 'teacher'),
((SELECT user_id FROM users WHERE username = 'dgreen'), 'dgreen@example.com', 'David', 'Green', 'student'),
((SELECT user_id FROM users WHERE username = 'emartin'), 'emartin@example.com', 'Eva', 'Martin', 'teacher');

INSERT INTO classes (class_name, class_description, class_code, start_date, end_date, max_students) VALUES
('Math 101', 'Introduction to Mathematics', 'M101', '2024-09-01', '2024-12-15', 30),
('History 201', 'World History Overview', 'H201', '2024-09-01', '2024-12-15', 25),
('Biology 301', 'Advanced Biology Studies', 'B301', '2024-09-01', '2024-12-15', 20),
('Physics 401', 'Physics for Engineers', 'P401', '2024-09-01', '2024-12-15', 30),
('Chemistry 101', 'Basic Chemistry', 'C101', '2024-09-01', '2024-12-15', 35);

INSERT INTO class_participants (class_id, user_id, role, enrollment_date) VALUES
((SELECT class_id FROM classes WHERE class_code = 'M101'), (SELECT user_id FROM users WHERE username = 'jdoe'), 'student', CURRENT_TIMESTAMP),
((SELECT class_id FROM classes WHERE class_code = 'M101'), (SELECT user_id FROM users WHERE username = 'bwhite'), 'student', CURRENT_TIMESTAMP),
((SELECT class_id FROM classes WHERE class_code = 'H201'), (SELECT user_id FROM users WHERE username = 'jdoe'), 'student', CURRENT_TIMESTAMP),
((SELECT class_id FROM classes WHERE class_code = 'B301'), (SELECT user_id FROM users WHERE username = 'bwhite'), 'student', CURRENT_TIMESTAMP),
((SELECT class_id FROM classes WHERE class_code = 'M101'), (SELECT user_id FROM users WHERE username = 'asmith'), 'teacher', CURRENT_TIMESTAMP),
((SELECT class_id FROM classes WHERE class_code = 'H201'), (SELECT user_id FROM users WHERE username = 'cjohnson'), 'teacher', CURRENT_TIMESTAMP),
((SELECT class_id FROM classes WHERE class_code = 'B301'), (SELECT user_id FROM users WHERE username = 'cjohnson'), 'teacher', CURRENT_TIMESTAMP),
((SELECT class_id FROM classes WHERE class_code = 'P401'), (SELECT user_id FROM users WHERE username = 'dgreen'), 'student', CURRENT_TIMESTAMP),
((SELECT class_id FROM classes WHERE class_code = 'C101'), (SELECT user_id FROM users WHERE username = 'emartin'), 'teacher', CURRENT_TIMESTAMP);

INSERT INTO assignments (class_id, title, description, attachments, due_date) VALUES
((SELECT class_id FROM classes WHERE class_code = 'M101'), 'Homework 1', 'Solve problems 1 to 10 from the textbook.', 'https://example.com/homework1.pdf', '2024-09-15 23:59:00'),
((SELECT class_id FROM classes WHERE class_code = 'H201'), 'Essay 1', 'Write an essay on the French Revolution.', 'https://example.com/french_revolution_reading.pdf', '2024-09-20 23:59:00'),
((SELECT class_id FROM classes WHERE class_code = 'B301'), 'Lab Report', 'Submit your lab report on the plant growth experiment.', 'https://example.com/lab_report_template.docx', '2024-09-25 23:59:00'),
((SELECT class_id FROM classes WHERE class_code = 'P401'), 'Physics Problem Set 1', 'Solve problem set 1 on dynamics.', 'https://example.com/physics_problem_set1.pdf', '2024-09-30 23:59:00'),
((SELECT class_id FROM classes WHERE class_code = 'C101'), 'Chemistry Quiz 1', 'Complete the quiz on atomic structure.', 'https://example.com/chemistry_quiz1.pdf', '2024-09-25 23:59:00');

INSERT INTO submissions (assignment_id, student_id, content, grade, feedback, graded_by, status) VALUES
((SELECT assignment_id FROM assignments WHERE title = 'Homework 1'), (SELECT user_id FROM users WHERE username = 'jdoe'), 'Submission content for Homework 1', 5, 'Great job!', (SELECT user_id FROM users WHERE username = 'teacher1'), 'Graded'),
((SELECT assignment_id FROM assignments WHERE title = 'Homework 1'), (SELECT user_id FROM users WHERE username = 'bwhite'), 'Submission content for Homework 1', 4, 'Good effort.', (SELECT user_id FROM users WHERE username = 'teacher1'), 'Graded'),
((SELECT assignment_id FROM assignments WHERE title = 'Essay 1'), (SELECT user_id FROM users WHERE username = 'jdoe'), 'Submission content for Essay 1', NULL, NULL, NULL, 'Pending'),
((SELECT assignment_id FROM assignments WHERE title = 'Lab Report'), (SELECT user_id FROM users WHERE username = 'bwhite'), 'Submission content for Lab Report', NULL, NULL, NULL, 'Pending'),
((SELECT assignment_id FROM assignments WHERE title = 'Physics Problem Set 1'), (SELECT user_id FROM users WHERE username = 'dgreen'), 'Submission content for Physics Problem Set 1', NULL, NULL, NULL, 'Pending'),
((SELECT assignment_id FROM assignments WHERE title = 'Chemistry Quiz 1'), (SELECT user_id FROM users WHERE username = 'dgreen'), 'Submission content for Chemistry Quiz 1', NULL, NULL, NULL, 'Pending');
