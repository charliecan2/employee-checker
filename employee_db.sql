CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
 id INT NOT NULL PRIMARY KEY,
 name VARCHAR(30)
);

INSERT INTO department (id, name) 
VALUES (1, "Engineering"), (2, "Sales"), (3, "Finance"), (4, "Legal");

CREATE TABLE role (
	id INT NOT NULL PRIMARY KEY,
	title VARCHAR(30),
    salary INT (6),
    department_id INT
);

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Lead Engineer", 160000, 1), (2, "Software Engineer", 95000, 1), 
(3, "Sales Lead", 80000, 2), (4, "Sales Reprentative", 54000, 2),
(5, "Financial Manager", 90000, 3), (6, "Financial Analyst", 65000, 3),
(7, "Lawyer", 140000, 4), (8, "Paralegal", 60000, 4);

CREATE TABLE employee (
	id INT PRIMARY KEY,
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