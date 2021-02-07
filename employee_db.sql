CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 department_name VARCHAR(30)
);

INSERT INTO department (id, department_name) 
VALUES (101, "Engineering"), (102, "Sales"), (103, "Finance"), (104, "Legal");

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(30),
    salary INT (6),
    department_id INT
);

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Lead Engineer", 160000, 101), (2, "Software Engineer", 95000, 101), 
(3, "Sales Lead", 80000, 102), (4, "Sales Reprentative", 54000, 102),
(5, "Financial Manager", 90000, 103), (6, "Financial Analyst", 65000, 103),
(7, "Lawyer", 140000, 104), (8, "Paralegal", 60000, 104);

CREATE TABLE employee (
	id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
VALUES (1, "James", "Smith", 1, null), (2, "Michael", "Gomez", 2, 1),
(3, "Sarah", "Jackson", 7, null), (4, "Vincent", "Chang", 8, 3),
(5, "Claudia", "White", 4, 6), (6, "Christian", "Brown", 3, null),
(7, "John", "Carlson", 5, null), (8, "Luis", "Hernandez", 6, 7),
(9, "Ashley", "Roberts", 2, 1);