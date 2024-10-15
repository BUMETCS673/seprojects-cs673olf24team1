-- Database: BUAN RELATIONAL DB
DROP TABLE IF EXISTS session_log;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS programs;
DROP TABLE IF EXISTS pathinterest_registration;
DROP TABLE IF EXISTS pathinterest_option;
DROP TABLE IF EXISTS path_interest;
DROP TABLE IF EXISTS course_prerequisite;
DROP TABLE IF EXISTS course_registration;
DROP TABLE IF EXISTS course_list;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS dept;
DROP TABLE IF EXISTS program_owner;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;

-- Table: session
CREATE TABLE sessions (
    session_id SERIAL PRIMARY KEY,
    session_created TIMESTAMP WITH TIME ZONE NOT NULL,
    is_closed BOOLEAN NOT NULL,
    session_closed TIMESTAMP WITH TIME ZONE,
    conversation VARCHAR,
    metadata VARCHAR
);

-- Table: program_owner
CREATE TABLE program_owner (
    programowner_id SERIAL PRIMARY KEY,
    f_name VARCHAR(10) NOT NULL,
    l_name VARCHAR(25) NOT NULL,
    bu_id VARCHAR(10),
    email VARCHAR(50),
    contact_number VARCHAR(25),
    title VARCHAR(50)
);

-- Table: department
CREATE TABLE dept (
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL,
    dept_code CHAR(3) NOT NULL
);

-- Table: course
CREATE TABLE course (
    course_id INTEGER PRIMARY KEY, -- DON'T CHANGE: KEEP AS NATURAL
    course_name VARCHAR(50) NOT NULL,
	credit_unit INTEGER NOT NULL,
    description VARCHAR(225) NOT NULL,
    is_active BOOLEAN NOT NULL,
    dept_id INTEGER NOT NULL REFERENCES dept(dept_id),
    workload_score INTEGER NOT NULL,
    diff_level INTEGER NOT NULL,
    is_prerequisite BOOLEAN NOT NULL
);

-- Table: course_list
CREATE TABLE course_list (
    courselist_id INTEGER PRIMARY KEY,
    list_notes VARCHAR(225)
);

-- Table: course_registration (bridge)
CREATE TABLE course_registration (
	registration_id SERIAL PRIMARY KEY,
    courselist_id INTEGER NOT NULL REFERENCES course_list(courselist_id),
    course_id INTEGER NOT NULL REFERENCES course(course_id)
);

-- Table: course_prerequisite (bridge)
CREATE TABLE course_prerequisite (
    prerequisite_id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES course(course_id),
    courselist_id INTEGER NOT NULL REFERENCES course_list(courselist_id)
);

-- Table: path_interest
CREATE TABLE path_interest (
    pathinterest_id SERIAL PRIMARY KEY,
    path_name VARCHAR(10) NOT NULL,
    courselist_id INTEGER NOT NULL REFERENCES course_list(courselist_id)
);

-- Table: pathinterest_option
CREATE TABLE pathinterest_option (
    pathinterestoption_id SERIAL PRIMARY KEY,
    option_notes VARCHAR(225)
);

-- TABLE: pathinterest_registration
CREATE TABLE pathinterest_registration (
	pathinterestregistration_id SERIAL PRIMARY KEY,
	pathinterestoption_id INTEGER NOT NULL REFERENCES pathinterest_option(pathinterestoption_id),
	pathinterest_id INTEGER NOT NULL REFERENCES path_interest(pathinterest_id)
);

-- Table: program
CREATE TABLE programs (
    program_id SERIAL PRIMARY KEY,
    is_certificate BOOLEAN NOT NULL,
    is_degree BOOLEAN NOT NULL,
    program_name VARCHAR(50) NOT NULL,
    prerequisite_program INTEGER REFERENCES course_list(courselist_id),
    core_program INTEGER REFERENCES course_list(courselist_id),
    unit_tograduate INTEGER NOT NULL,
    dept_id INTEGER NOT NULL REFERENCES dept(dept_id),
    pathinterestoption_id INTEGER NOT NULL REFERENCES pathinterest_option(pathinterestoption_id),
    program_level VARCHAR(10) NOT NULL,
    program_code VARCHAR(10) NOT NULL,
    elective_program INTEGER REFERENCES course_list(courselist_id),
    concentration_program INTEGER REFERENCES course_list(courselist_id),
    programowner_id INTEGER REFERENCES program_owner(programowner_id),
    program_notes VARCHAR(225)
);

-- Table: student
CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users(user_id),
    program_id INTEGER NOT NULL REFERENCES programs(program_id),
    course_taken INTEGER NOT NULL REFERENCES course_list(courselist_id),
    path_interest INTEGER NOT NULL REFERENCES path_interest(pathinterest_id),
    course_to_take INTEGER NOT NULL,
    bu_id VARCHAR(10),
    graduate_goal VARCHAR(10),
    is_instate BOOLEAN,
    is_outstate BOOLEAN,
    is_f1 BOOLEAN,
    is_j1 BOOLEAN,
    is_h1b BOOLEAN,
    is_other BOOLEAN,
    other_visastatus VARCHAR(10),
    is_parttime BOOLEAN,
    is_full_time BOOLEAN
);

-- Table: user
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
	username VARCHAR(10),
	user_role VARCHAR(25) NOT NULL,
	f_name VARCHAR(10) NOT NULL,
	l_name VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password_hash VARCHAR(50) NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
	last_login TIMESTAMP WITH TIME ZONE,
	user_preference VARCHAR
);

-- Table: session_log (bridge)
CREATE TABLE session_log (
    sessionlog_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    session_id INTEGER NOT NULL REFERENCES sessions(session_id),
    is_active BOOLEAN NOT NULL,
    is_saved BOOLEAN NOT NULL
);



-- Create indexes on foreign keys

-- Table: course
CREATE INDEX idx_course_dept_id ON course (dept_id);

-- Table: course_registration
CREATE INDEX idx_course_registration_course_id ON course_registration (course_id);
CREATE INDEX idx_course_registration_courselist_id ON course_registration (courselist_id);

-- Table: course_prerequisite
CREATE INDEX idx_course_prerequisite_course_id ON course_prerequisite (course_id);
CREATE INDEX idx_course_prerequisite_courselist_id ON course_prerequisite (courselist_id);

-- Table: path_interest
CREATE INDEX idx_path_interest_courselist_id ON path_interest (courselist_id);

-- Table: pathinterest_registration
CREATE INDEX idx_pathinterest_registration_pathinterest_id ON pathinterest_registration (pathinterest_id);
CREATE INDEX idx_pathinterest_registration_pathinterestoption_id ON pathinterest_registration (pathinterestoption_id);

-- Table: programs
CREATE INDEX idx_programs_prerequisite_program ON programs (prerequisite_program);
CREATE INDEX idx_programs_core_program ON programs (core_program);
CREATE INDEX idx_programs_dept_id ON programs (dept_id);
CREATE INDEX idx_programs_pathinterestoption_id ON programs (pathinterestoption_id);
CREATE INDEX idx_programs_elective_program ON programs (elective_program);
CREATE INDEX idx_programs_concentration_program ON programs (concentration_program);
CREATE INDEX idx_programs_programowner_id ON programs (programowner_id);

-- Table: student
CREATE INDEX idx_student_program_id ON student (program_id);
CREATE INDEX idx_student_course_taken ON student (course_taken);
CREATE INDEX idx_student_path_interest ON student (path_interest);
CREATE INDEX idx_student_course_to_take ON student (course_to_take);

-- Table: users
CREATE INDEX idx_users_student_id ON users (student_id);

-- Table: session_log
CREATE INDEX idx_session_log_user_id ON session_log (user_id);
CREATE INDEX idx_session_log_session_id ON session_log (session_id);

-- Table: sessions
CREATE INDEX idx_sessions_metadata ON sessions (metadata);
CREATE INDEX idx_sessions_conversation ON sessions (conversation);

-- Table: users
CREATE INDEX idx_users_f_name ON users (f_name);



-- Populate the dept
INSERT INTO dept (dept_id, dept_name, dept_code)
VALUES (1, 'Computer Science', 'cs');

-- Populate the courses
INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (521, 'Information Structures with Python', 4, 'This course covers the concepts of the object-oriented approach to software design and development using Python. It includes a detailed discussion of programming concepts starting with the fundamentals of data types, control structures methods, classes, arrays and strings, and proceeding to advanced topics such as inheritance and polymorphism, creating user interfaces, exceptions and streams. Upon completion of this course students will be able to apply software engineering principles to design and implement Python applications that can be used in with analytics and big data.', TRUE, 1, 5, 3, TRUE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (526, 'Data Structure and Algorithms', 4, 'This course covers and relates fundamental components of programs. Students use various data structures to solve computational problems, and implement data structures using a high-level programming language. Algorithms are created, decomposed, and expressed as pseudocode. The running time of various algorithms and their computational complexity are analyzed.', TRUE, 1, 5, 5, TRUE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (622, 'Advanced Programming Techniques', 4, 'Polymorphism, containers, libraries, method specifications, large-scale code management, use of exceptions, concurrent programming, functional programming, programming tests. Java will be used to illustrate these concepts. Students will implement a project or projects of their own choosing, in Java, since some concepts are expressible only in Java', TRUE, 1, 5, 4, FALSE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (665, 'Software Design and Patterns', 4, 'Software design principles, the object-oriented paradigm, unified modeling language; creational, structural, and behavioral design patterns; OO analysis and design; implementation of semester project. Laboratory course.', TRUE, 1, 5, 4, FALSE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (673, 'Software Engineering', 4, 'Overview of techniques and tools to develop high quality software. Topics include software development life cycle such as Agile and DevOps, requirements analysis, software design, programming techniques, refactoring, testing, as well as software management issues. This course features a semester-long group project where students will design and develop a real world software system in groups using Agile methodology and various SE tools, including UML tools, project management tools, programming frameworks, unit and system testing tools , integration tools and version control tools.', TRUE, 1, 5, 3, FALSE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (682, 'Information Systems Analysis and Design', 4, 'Object-oriented methods of information systems analysis and design for organizations with data- processing needs. System feasibility; requirements analysis; database utilization; Unified Modeling Language; software system architecture, design, and implementation, management; project control; and systems-level testing.', TRUE, 1, 5, 3, TRUE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (601, 'Web Application Development', 4, 'Learn essential front-end development skills, starting with foundational JavaScript techniques, such as DOM manipulation and event handling, and advancing to interactive web technologies like HTML''s Drag and Drop, Canvas, and SVG. You will be exposed to asynchronous operations, including AJAX, the Fetch API, and Web Workers, and learn to craft responsive designs using Flexbox, CSS Grid, and advanced CSS selectors. A comprehensive exploration of TypeScript and its main feature, static typing, and capabilities will also be covered.  The course concludes with a comprehensive dive into ReactJS, covering its core architectural concepts, component-based structure, and state management techniques', TRUE, 1, 5, 3, TRUE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (602, 'Server-Side Web Development', 4, 'The Server-Side Web Development course concentrates primarily on building web applications using PHP/MySQL and Node.js/MongoDB. The course is divided into various modules covering in depth the following topics: PHP, MySQL, Object oriented PHP, PHP MVC, Secure Web applications, Node.js and MongoDB. Along with the fundamentals underlying these technologies, several applications will be showcased as case studies. Students work with these technologies starting with simple applications and then examining real world complex applications. At the end of this course, students would have mastered the web application development on the server-side.', TRUE, 1, 5, 5, FALSE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (633, 'Software Quality, Testing, and Security Management', 4, 'Theory and practice of security and quality assurance and testing for each step of the software development cycle. Verification vs. validation. Test case design techniques, test coverage criteria, security development and verification practices, and tools for static and dynamic analysis. Standards. Test-driven development. QA for maintenance and legacy applications. From a project management knowledge perspective, this course covers the methods, tools and techniques associated with the following processes -- Plan Quality, Perform Quality Assurance, and Perform Quality Control.', TRUE, 1, 5, 4, FALSE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (634, 'Agile Software Development', 4, 'This course provides students with a comprehensive overview of the principles, processes, and practices of agile software development. Students learn techniques for initiating, planning and executing on software development projects using agile methodologies. Students will obtain practical knowledge of agile development frameworks and be able to distinguish between agile and traditional project management methodologies. Students will learn how to apply agile tools and techniques in the software development lifecycle from project ideation to deployment, including establishing an agile team environment, roles and responsibilities, communication and reporting methods, and embracing change. We also leverage the guidelines outlined by the Project Management Institute for agile project development as a framework in this course.', TRUE, 1, 5, 4, FALSE);

INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (664, 'Artificial Intelligence', 4, 'Study of the ideas and techniques that enable computers to behave intelligently. Search, constraint propagations, and reasoning. Knowledge representation, natural language, learning, question answering, inference, visual perception, and/or problem solving. Laboratory course.', TRUE, 1, 5, 4, TRUE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (669, 'Database Design and Implementation for Business', 4, 'This course may not be taken in conjunction with MET CS 469 (undergraduate) or MET CS 579. Only one of these courses can be counted towards degree requirements. - Students learn the latest relational and object-relational tools and techniques for persistent data and object modeling and management. Students gain extensive hands- on experience using Oracle or Microsoft SQL Server as they learn the Structured Query Language (SQL) and design and implement databases. Students design and implement a database system as a term project.', TRUE, 1, 5, 3, TRUE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (677, 'Data Science with Python', 4, 'Students will learn major Python tools and techniques for data analysis. There are weekly assignments and mini projects on topics covered in class. These assignments will help build necessary statistical, visualization and other data science skills for effective use of data science in a variety of applications including finance, text processing, time series analysis and recommendation systems. In addition, students will choose a topic for a final project and present it on the last day of class.', TRUE, 1, 5, 3, TRUE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (683, 'Mobile Application Development with Android', 4, 'This course discusses the principles and issues associated with mobile application development using Android as the development platform. Topics covered will include Android application components (Activities, Services, Content Providers and Broadcast Receivers), ICC (Inter-component Communication), UI design, data storage, asynchronous processing, 2D graphics, and Android security. Students will develop their own apps in Java and/or Kotlin using Android Studio in their semester-long projects. Prior knowledge of Java programming is required.', TRUE, 1, 5, 5, FALSE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (701, 'Rich Internet Application Development', 4, 'The Rich Internet Application (RIA) Development course concentrates primarily on building rich client web applications in the browser for desktop and mobile devices. The course is divided into various modules covering in depth the following technologies: HTML5, AngularJS, and Ionic framework. Along with the fundamentals underlying these technologies, several applications will be showcased as case studies. Students work with these technologies starting with simple applications and then examining real world complex applications. At the end of this course, students would have mastered the latest and widely used RIA methodologies.', TRUE, 1, 5, 5, FALSE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (763, 'Secure Software Development', 4, 'Overview of techniques and tools to develop secure software. Focus on the application security. Topics include secure software development processes, threat modeling, secure requirements and architectures, vulnerability and malware analysis using static code analysis and dynamic analysis tools, vulnerabilities in C/C++ and Java programs, Crypto and secure APIs, vulnerabilities in web applications and mobile applications, and security testing. Hands-on lab and programming exercises using current tools are provided and required.', TRUE, 1, 5, 5, FALSE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (767, 'Advance Machine Learning and Neural Networks', 4, 'Theories and methods for learning from data. The course covers a variety of approaches, including Supervised and Unsupervised Learning, Regression, k-means, KNN’s, Neural Nets and Deep Learning, Recurrent Neural Nets, Rule-learning, Adversarial Learning, Bayesian Learning, and Genetic Algorithms. The underpinnings are covered: perceptrons, backpropagation, attention, and transformers. Each student focuses on two of these approaches and creates a term project.', TRUE, 1, 5, 4, TRUE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (546, 'Introduction to Probability and Statistics', 4, 'The goal of this course is to provide students with the mathematical fundamentals required for successful quantitative analysis of problems. The first part of the course introduces the mathematical prerequisites for understanding probability and statistics. Topics include combinatorial mathematics, functions, and the fundamentals of differentiation and integration. The second part of the course concentrates on the study of elementary probability theory, discrete and continuous distributions.', TRUE, 1, 1, 2, TRUE);


INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (575, 'Operating Systems', 4, 'Overview of operating system characteristics, design objectives, and structures. Topics include concurrent processes, coordination of asynchronous events, file systems, resource sharing, memory management, security, scheduling and deadlock problems.', TRUE, 1, 2, 5, TRUE);

INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id, workload_score, diff_level, is_prerequisite)
VALUES (579, 'Database Management', 4, 'This course provides a theoretical yet modern presentation of database topics ranging from Data and Object Modeling, relational algebra and normalization to advanced topics such as how to develop Web-based database applications. Other topics covered - relational data model, SQL and manipulating relational data; applications programming for relational databases; physical characteristics of databases; achieving performance and reliability with database systems; object- oriented database systems. Prereq: MET CS 231 or MET CS 232; or instructor''s consent.', TRUE, 1, 5, 3, TRUE);

-- Populate the course_list
INSERT INTO course_list (courselist_id, list_notes)
VALUES (1, 'Prerequisite for general');

INSERT INTO course_list (courselist_id, list_notes)
VALUES (2, 'Prerequisite for ADA');

INSERT INTO course_list (courselist_id, list_notes)
VALUES (3, 'Core of MSSD');

INSERT INTO course_list (courselist_id, list_notes)
VALUES (4, 'Elective of MSSD');

INSERT INTO course_list (courselist_id, list_notes)
VALUES (5, 'web development path mssd');

INSERT INTO course_list (courselist_id, list_notes)
VALUES (6, 'ai/ml path mssd');

INSERT INTO course_list (courselist_id, list_notes)
VALUES (7, 'data science path mssd');

INSERT INTO course_list (courselist_id, list_notes)
VALUES (8, 'secure software development path mssd');

INSERT INTO course_list (courselist_id, list_notes)
VALUES (9, 'app development path mssd');

INSERT INTO course_list (courselist_id, list_notes)
VALUES (10, 'Jane doe course taken');

INSERT INTO course_list (courselist_id, list_notes)
VALUES (11, 'John Smith course taken');

INSERT INTO course_list (courselist_id, list_notes)
VALUES (12, 'Prereq for 602');

INSERT INTO course_list (courselist_id, list_notes)
VALUES (13, 'Prereq for 701');

INSERT INTO course_list (courselist_id, list_notes)
VALUES (14, 'Prereq for 763');

INSERT INTO course_list (courselist_id, list_notes)
VALUES (15, 'Prereq for 767');


-- Popuate the course_prereq
INSERT INTO course_prerequisite (course_id, courselist_id)
VALUES (622, 1);

INSERT INTO course_prerequisite (course_id, courselist_id)
VALUES (665, 1);

INSERT INTO course_prerequisite (course_id, courselist_id)
VALUES (601, 1);

INSERT INTO course_prerequisite (course_id, courselist_id)
VALUES (602, 12);

INSERT INTO course_prerequisite (course_id, courselist_id)
VALUES (633, 1);

INSERT INTO course_prerequisite (course_id, courselist_id)
VALUES (634, 1);

INSERT INTO course_prerequisite (course_id, courselist_id)
VALUES (664, 1);

INSERT INTO course_prerequisite (course_id, courselist_id)
VALUES (669, 1);

INSERT INTO course_prerequisite (course_id, courselist_id)
VALUES (677, 1);

INSERT INTO course_prerequisite (course_id, courselist_id)
VALUES (683, 1);

INSERT INTO course_prerequisite (course_id, courselist_id)
VALUES (701, 13);

INSERT INTO course_prerequisite (course_id, courselist_id)
VALUES (763, 14);
	
INSERT INTO course_prerequisite (course_id, courselist_id)
VALUES (767, 15);

-- Populate the course_registration
INSERT INTO course_registration (courselist_id, course_id)
VALUES (1, 521);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (1, 526);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (2, 521);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (2, 526);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (2, 579);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (2, 546);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (3, 622);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (3, 665);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (3, 673);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (3, 682);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (4, 601);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (4, 602);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (4, 633);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (4, 634);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (4, 669);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (4, 677);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (4, 683);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (4, 701);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (4, 763);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (4, 767);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (5, 601);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (5, 602);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (5, 701);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (6, 664);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (6, 677);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (6, 767);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (7, 669);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (7, 677);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (7, 767);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (8, 633);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (8, 634);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (8, 763);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (9, 683);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (9, 602);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (9, 601);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (10, 521);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (10, 526);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (10, 622);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (10, 665);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (10, 673);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (10, 677);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (11, 521);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (11, 526);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (11, 622);


INSERT INTO course_registration (courselist_id, course_id)
VALUES (11, 665);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (11, 601);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (12, 601);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (12, 521);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (12, 526);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (13, 521);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (13, 526);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (13, 601);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (13, 602);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (14, 521);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (14, 526);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (14, 633);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (15, 521);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (15, 526);

INSERT INTO course_registration (courselist_id, course_id)
VALUES (15, 677);


-- Populate path interest 
INSERT INTO path_interest (path_name, courselist_id) VALUES ('web development', 5);
INSERT INTO path_interest (path_name, courselist_id) VALUES ('ai/ml', 6);
INSERT INTO path_interest (path_name, courselist_id) VALUES ('data science', 7);
INSERT INTO path_interest (path_name, courselist_id) VALUES ('secure software development', 8);
INSERT INTO path_interest (path_name, courselist_id) VALUES ('app development', 9);

-- Populate path interest option
INSERT INTO pathinterest_option (pathinterestoption_id, option_notes) 
VALUES (1, 'MSSD path interests');
	
-- Populate path interest registration
INSERT INTO pathinterest_registration (pathinterestoption_id, pathinterest_id)
VALUES (1, 1);

INSERT INTO pathinterest_registration (pathinterestoption_id, pathinterest_id)
VALUES (1, 2);

INSERT INTO pathinterest_registration (pathinterestoption_id, pathinterest_id)
VALUES (1, 3);

INSERT INTO pathinterest_registration (pathinterestoption_id, pathinterest_id)
VALUES (1, 4);
	
INSERT INTO pathinterest_registration (pathinterestoption_id, pathinterest_id)
VALUES (1, 5);
	
-- Populate programs table
INSERT INTO programs (program_id, program_code, program_name, is_certificate, is_degree, program_level, unit_tograduate, prerequisite_program, core_program, elective_program, dept_id, pathinterestoption_id)
VALUES (1, 'mssd', 'Software Development', false, true, 'graduate', 32, 1, 3, 4, 1, 1);


-- Populate student table
INSERT INTO student (user_id, program_id, course_taken, path_interest, course_to_take, bu_id, graduate_goal, is_instate, is_outstate, is_f1, is_j1, is_h1b, is_other, other_visastatus, is_parttime, is_full_time)
VALUES (1, 1, 10, 1, 3, 'U15811234', 'Fall 2025', TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, 'na', FALSE, TRUE);

INSERT INTO student (user_id, program_id, course_taken, path_interest, course_to_take, bu_id, graduate_goal, is_instate, is_outstate, is_f1, is_j1, is_h1b, is_other, other_visastatus, is_parttime, is_full_time)
VALUES (1, 1, 11, 4, 4, 'U13135556', 'Spring 2026', FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, 'na', FALSE, TRUE);


-- Populate user table
INSERT INTO users (username, user_role, f_name, l_name, email, password_hash)
VALUES ('jdoe', 'student', 'Jane', 'Doe', 'jdoe@bu.edu', 'password_hashed');

INSERT INTO users (username, user_role, f_name, l_name, email, password_hash)
VALUES ('jsmith','student', 'John', 'Smith', 'jsmith@bu.edu', 'buantest123_hashed');

-- Stored Procedures
-- Procedure: Add New Program
CREATE OR REPLACE FUNCTION add_program(
    is_certificate BOOLEAN,
    is_degree BOOLEAN,
    program_name VARCHAR,
    prerequisite_program INTEGER,
    core_program INTEGER,
    unit_tograduate INTEGER,
    dept_id INTEGER,
    pathinterestoption_id INTEGER,
    program_level VARCHAR,
    program_code VARCHAR,
    elective_program INTEGER,
    concentration_program INTEGER,
    programowner_id INTEGER,
    program_notes VARCHAR
) RETURNS VOID AS $$
BEGIN
    INSERT INTO programs (is_certificate, is_degree, program_name, prerequisite_program, core_program,
        unit_tograduate, dept_id, pathinterestoption_id, program_level, program_code,
        elective_program, concentration_program, programowner_id, program_notes)
    VALUES (is_certificate, is_degree, program_name, prerequisite_program, core_program,
        unit_tograduate, dept_id, pathinterestoption_id, program_level, program_code,
        elective_program, concentration_program, programowner_id, program_notes);
END;
$$ LANGUAGE plpgsql;


-- Procedure: Add a New Course
CREATE OR REPLACE FUNCTION add_course(
    course_id INTEGER,
    course_name VARCHAR,
    credit_unit INTEGER,
    description VARCHAR,
    is_active BOOLEAN,
    dept_id INTEGER,
    workload_score INTEGER,
    diff_level INTEGER,
    is_prerequisite BOOLEAN,
    prerequisite_course_id INTEGER DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
    INSERT INTO course (course_id, course_name, credit_unit, description, is_active, dept_id,
        workload_score, diff_level, is_prerequisite)
    VALUES (course_id, course_name, credit_unit, description, is_active, dept_id,
        workload_score, diff_level, is_prerequisite);

    IF prerequisite_course_id IS NOT NULL THEN
        INSERT INTO course_prerequisite (course_id, courselist_id)
        VALUES (course_id, prerequisite_course_id);
    END IF;
END;
$$ LANGUAGE plpgsql;


-- Procedure: Add a New User
CREATE OR REPLACE FUNCTION add_user(
    username VARCHAR,
    user_role VARCHAR,
    f_name VARCHAR,
    l_name VARCHAR,
    email VARCHAR,
    password_hash VARCHAR
) RETURNS INTEGER AS $$
DECLARE
    new_user_id INTEGER;
BEGIN
    INSERT INTO users (username, user_role, f_name, l_name, email, password_hash)
    VALUES (username, user_role, f_name, l_name, email, password_hash)
    RETURNING user_id INTO new_user_id;

    RETURN new_user_id; -- return the new user ID
END;
$$ LANGUAGE plpgsql;


-- Procedure: Add a New Student
CREATE OR REPLACE FUNCTION add_student(
    user_id INTEGER,
    program_id INTEGER,
    course_taken INTEGER,
    path_interest INTEGER,
    course_to_take INTEGER,
    bu_id VARCHAR,
    graduate_goal VARCHAR,
    is_instate BOOLEAN,
    is_outstate BOOLEAN,
    is_f1 BOOLEAN,
    is_j1 BOOLEAN,
    is_h1b BOOLEAN,
    is_other BOOLEAN,
    other_visastatus VARCHAR,
    is_parttime BOOLEAN,
    is_full_time BOOLEAN
) RETURNS VOID AS $$
BEGIN
    INSERT INTO student (user_id, program_id, course_taken, path_interest, course_to_take,
        bu_id, graduate_goal, is_instate, is_outstate, is_f1, is_j1, is_h1b, is_other,
        other_visastatus, is_parttime, is_full_time)
    VALUES (user_id, program_id, course_taken, path_interest, course_to_take,
        bu_id, graduate_goal, is_instate, is_outstate, is_f1, is_j1, is_h1b, is_other,
        other_visastatus, is_parttime, is_full_time);
END;
$$ LANGUAGE plpgsql;


-- Procedure: Update Student Information
CREATE OR REPLACE FUNCTION update_student(
    student_id INTEGER,
    course_taken INTEGER,
    path_interest INTEGER,
    course_to_take INTEGER,
    bu_id VARCHAR,
    graduate_goal VARCHAR,
    is_instate BOOLEAN,
    is_outstate BOOLEAN,
    is_f1 BOOLEAN,
    is_j1 BOOLEAN,
    is_h1b BOOLEAN,
    is_other BOOLEAN,
    other_visastatus VARCHAR,
    is_parttime BOOLEAN,
    is_full_time BOOLEAN
) RETURNS VOID AS $$
DECLARE
    new_course_list_id INTEGER;
BEGIN
    -- Create a new course list
    INSERT INTO course_list (list_notes)
    VALUES ('Course list for student ID ' || student_id) RETURNING courselist_id INTO new_course_list_id;

    -- Update student information
    UPDATE student SET
        course_taken = new_course_list_id,
        path_interest = path_interest,
        course_to_take = course_to_take,
        bu_id = bu_id,
        graduate_goal = graduate_goal,
        is_instate = is_instate,
        is_outstate = is_outstate,
        is_f1 = is_f1,
        is_j1 = is_j1,
        is_h1b = is_h1b,
        is_other = is_other,
        other_visastatus = other_visastatus,
        is_parttime = is_parttime,
        is_full_time = is_full_time
    WHERE student_id = student_id;
END;
$$ LANGUAGE plpgsql;


-- Procedure: Update User Information
CREATE OR REPLACE FUNCTION update_user(
    user_id INTEGER,
    username VARCHAR,
    user_role VARCHAR,
    f_name VARCHAR,
    l_name VARCHAR,
    email VARCHAR,
    password_hash VARCHAR
) RETURNS VOID AS $$
BEGIN
    UPDATE users SET
        username = username,
        user_role = user_role,
        f_name = f_name,
        l_name = l_name,
        email = email,
        password_hash = password_hash
    WHERE user_id = user_id;
END;
$$ LANGUAGE plpgsql;


-- Procedure: Update Program Information
CREATE OR REPLACE FUNCTION update_program(
    program_id INTEGER,
    is_certificate BOOLEAN,
    is_degree BOOLEAN,
    program_name VARCHAR,
    prerequisite_program INTEGER,
    core_program INTEGER,
    unit_tograduate INTEGER,
    dept_id INTEGER,
    pathinterestoption_id INTEGER,
    program_level VARCHAR,
    program_code VARCHAR,
    elective_program INTEGER,
    concentration_program INTEGER,
    programowner_id INTEGER,
    program_notes VARCHAR
) RETURNS VOID AS $$
BEGIN
    UPDATE programs SET
        is_certificate = is_certificate,
        is_degree = is_degree,
        program_name = program_name,
        prerequisite_program = prerequisite_program,
        core_program = core_program,
        unit_tograduate = unit_tograduate,
        dept_id = dept_id,
        pathinterestoption_id = pathinterestoption_id,
        program_level = program_level,
        program_code = program_code,
        elective_program = elective_program,
        concentration_program = concentration_program,
        programowner_id = programowner_id,
        program_notes = program_notes
    WHERE program_id = program_id;
END;
$$ LANGUAGE plpgsql;


-- Procedure: Update Course Information
CREATE OR REPLACE FUNCTION update_course(
    course_id INTEGER,
    course_name VARCHAR,
    credit_unit INTEGER,
    description VARCHAR,
    is_active BOOLEAN,
    dept_id INTEGER,
    workload_score INTEGER,
    diff_level INTEGER,
    is_prerequisite BOOLEAN
) RETURNS VOID AS $$
BEGIN
    UPDATE course SET
        course_name = course_name,
        credit_unit = credit_unit,
        description = description,
        is_active = is_active,
        dept_id = dept_id,
        workload_score = workload_score,
        diff_level = diff_level,
        is_prerequisite = is_prerequisite
    WHERE course_id = course_id;
END;
$$ LANGUAGE plpgsql;


-- Procedure: Create New Session Information
CREATE OR REPLACE FUNCTION create_session(
    conversation VARCHAR,
    metadata VARCHAR
) RETURNS INTEGER AS $$
DECLARE
    new_session_id INTEGER;
BEGIN
    INSERT INTO sessions (session_created, is_closed, conversation, metadata)
    VALUES (CURRENT_TIMESTAMP, FALSE, conversation, metadata)
    RETURNING session_id INTO new_session_id;

    RETURN new_session_id; -- return the new session ID
END;
$$ LANGUAGE plpgsql;


-- Procedure: Update Session Information
CREATE OR REPLACE FUNCTION update_session(
    session_id INTEGER,
    is_closed BOOLEAN,
    conversation VARCHAR,
    metadata VARCHAR
) RETURNS VOID AS $$
BEGIN
    UPDATE sessions SET
        is_closed = is_closed,
        session_closed = CURRENT_TIMESTAMP,
        conversation = conversation,
        metadata = metadata
    WHERE session_id = session_id;
END;
$$ LANGUAGE plpgsql;


-- Procedure: Retrieve Student Course and Program Information
CREATE OR REPLACE FUNCTION retrieve_student_info(student_id INTEGER)
RETURNS TABLE(course_taken INTEGER, course_to_take INTEGER, path_interest INTEGER, program_id INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT course_taken, course_to_take, path_interest, program_id
    FROM student
    WHERE student_id = student_id;
END;
$$ LANGUAGE plpgsql;


-- Procedure: Retrieve Conversation JSON
CREATE OR REPLACE FUNCTION retrieve_conversation(session_id INTEGER)
RETURNS VARCHAR AS $$
DECLARE
    conversation_data VARCHAR;
BEGIN
    SELECT conversation INTO conversation_data
    FROM sessions
    WHERE session_id = session_id;

    RETURN conversation_data;
END;
$$ LANGUAGE plpgsql;


-- Procedure: Retrieve Program information
CREATE OR REPLACE FUNCTION retrieve_program_info(program_id INTEGER)
RETURNS TABLE(is_certificate BOOLEAN, is_degree BOOLEAN, program_name VARCHAR, unit_tograduate INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT is_certificate, is_degree, program_name, unit_tograduate
    FROM programs
    WHERE program_id = program_id;
END;
$$ LANGUAGE plpgsql;


-- Procedure: Retrieve Course Information
CREATE OR REPLACE FUNCTION retrieve_course_info(course_id INTEGER)
RETURNS TABLE(course_name VARCHAR, description VARCHAR, is_active BOOLEAN) AS $$
BEGIN
    RETURN QUERY
    SELECT course_name, description, is_active
    FROM course
    WHERE course_id = course_id;
END;
$$ LANGUAGE plpgsql;

-- Procedure: Retrieve Student Information
CREATE OR REPLACE FUNCTION retrieve_student_info_by_id(student_id INTEGER)
RETURNS TABLE(user_id INTEGER, program_id INTEGER, course_taken INTEGER, path_interest INTEGER, course_to_take INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT user_id, program_id, course_taken, path_interest, course_to_take
    FROM student
    WHERE student_id = student_id;
END;
$$ LANGUAGE plpgsql;


-- Procedure: Retrieve User Information
CREATE OR REPLACE FUNCTION retrieve_user_info(user_id INTEGER)
RETURNS TABLE(username VARCHAR, user_role VARCHAR, f_name VARCHAR, l_name VARCHAR, email VARCHAR) AS $$
BEGIN
    RETURN QUERY
    SELECT username, user_role, f_name, l_name, email
    FROM users
    WHERE user_id = user_id;
END;
$$ LANGUAGE plpgsql;


-- Example of Usage
-- Example: Add a new program
SELECT add_program(
    FALSE, TRUE, 'New Program', NULL, NULL, 32, 1, 1, 'graduate', 'new_prog_code', 
    NULL, NULL, NULL, 'Notes about the program'
);
