INSERT INTO users (username, password_hash) VALUES
('jdoe', 'password_hash_1'),
('asmith', 'password_hash_2'),
('bwhite', 'password_hash_3'),
('cjohnson', 'password_hash_4');

INSERT INTO profiles (user_id, email, first_name, last_name, role) VALUES
(1, 'jdoe@example.com', 'John', 'Doe', 'student'),
(2, 'asmith@example.com', 'Alice', 'Smith', 'teacher'),
(3, 'bwhite@example.com', 'Bob', 'White', 'student'),
(4, 'cjohnson@example.com', 'Carol', 'Johnson', 'teacher');

INSERT INTO classes (class_name) VALUES
('Math 101'),
('History 201'),
('Biology 301');

INSERT INTO class_students (class_id, student_id) VALUES
(1, 1),
(1, 3),
(2, 1),
(3, 3);

INSERT INTO class_teachers (class_id, teacher_id) VALUES
(1, 2),
(2, 4),
(3, 4);

INSERT INTO assignments (class_id, title, description, due_date) VALUES
(1, 'Homework 1', 'Solve problems 1 to 10 from the textbook.', '2024-09-15 23:59:00'),
(2, 'Essay 1', 'Write an essay on the French Revolution.', '2024-09-20 23:59:00'),
(3, 'Lab Report', 'Submit your lab report on the plant growth experiment.', '2024-09-25 23:59:00');

INSERT INTO submissions (assignment_id, student_id, content, grade, feedback) VALUES
(1, 1, 'Submission content for Homework 1', 95.00, 'Great job!'),
(1, 3, 'Submission content for Homework 1', 88.00, 'Good effort.'),
(2, 1, 'Submission content for Essay 1', NULL, NULL),
(3, 3, 'Submission content for Lab Report', NULL, NULL);