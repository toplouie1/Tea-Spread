\c tea_dev;

INSERT INTO users (username, password_hash) VALUES
('jdoe', 'password_hash_1'),
('asmith', 'password_hash_2'),
('bwhite', 'password_hash_3'),
('cjohnson', 'password_hash_4');

-- Insert data into profiles
INSERT INTO profiles (user_id, email, first_name, last_name, role) VALUES
((SELECT user_id FROM users WHERE username = 'jdoe'), 'jdoe@example.com', 'John', 'Doe', 'student'),
((SELECT user_id FROM users WHERE username = 'asmith'), 'asmith@example.com', 'Alice', 'Smith', 'teacher'),
((SELECT user_id FROM users WHERE username = 'bwhite'), 'bwhite@example.com', 'Bob', 'White', 'student'),
((SELECT user_id FROM users WHERE username = 'cjohnson'), 'cjohnson@example.com', 'Carol', 'Johnson', 'teacher');

-- Insert data into classes
INSERT INTO classes (class_name) VALUES
('Math 101'),
('History 201'),
('Biology 301');

-- Insert data into class_students
INSERT INTO class_students (class_id, student_id) VALUES
((SELECT class_id FROM classes WHERE class_name = 'Math 101'), (SELECT user_id FROM users WHERE username = 'jdoe')),
((SELECT class_id FROM classes WHERE class_name = 'Math 101'), (SELECT user_id FROM users WHERE username = 'bwhite')),
((SELECT class_id FROM classes WHERE class_name = 'History 201'), (SELECT user_id FROM users WHERE username = 'jdoe')),
((SELECT class_id FROM classes WHERE class_name = 'Biology 301'), (SELECT user_id FROM users WHERE username = 'bwhite'));

-- Insert data into class_teachers
INSERT INTO class_teachers (class_id, teacher_id) VALUES
((SELECT class_id FROM classes WHERE class_name = 'Math 101'), (SELECT user_id FROM users WHERE username = 'asmith')),
((SELECT class_id FROM classes WHERE class_name = 'History 201'), (SELECT user_id FROM users WHERE username = 'cjohnson')),
((SELECT class_id FROM classes WHERE class_name = 'Biology 301'), (SELECT user_id FROM users WHERE username = 'cjohnson'));

-- Insert data into assignments
INSERT INTO assignments (class_id, title, description, due_date) VALUES
((SELECT class_id FROM classes WHERE class_name = 'Math 101'), 'Homework 1', 'Solve problems 1 to 10 from the textbook.', '2024-09-15 23:59:00'),
((SELECT class_id FROM classes WHERE class_name = 'History 201'), 'Essay 1', 'Write an essay on the French Revolution.', '2024-09-20 23:59:00'),
((SELECT class_id FROM classes WHERE class_name = 'Biology 301'), 'Lab Report', 'Submit your lab report on the plant growth experiment.', '2024-09-25 23:59:00');

-- Insert data into submissions
INSERT INTO submissions (assignment_id, student_id, content, grade, feedback) VALUES
((SELECT assignment_id FROM assignments WHERE title = 'Homework 1'), (SELECT user_id FROM users WHERE username = 'jdoe'), 'Submission content for Homework 1', 95.00, 'Great job!'),
((SELECT assignment_id FROM assignments WHERE title = 'Homework 1'), (SELECT user_id FROM users WHERE username = 'bwhite'), 'Submission content for Homework 1', 88.00, 'Good effort.'),
((SELECT assignment_id FROM assignments WHERE title = 'Essay 1'), (SELECT user_id FROM users WHERE username = 'jdoe'), 'Submission content for Essay 1', NULL, NULL),
((SELECT assignment_id FROM assignments WHERE title = 'Lab Report'), (SELECT user_id FROM users WHERE username = 'bwhite'), 'Submission content for Lab Report', NULL, NULL);