const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mh3_Ren!',
    database: 'employee_db'
})

connection.connect(err => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`)
})

function init() {
    inquirer.prompt([
        {
            type: 'list',
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Department", "Add Role", "Update Employee Role", "Quit App"],
            name: 'action'
        }
    ]).then((response) => {
        if (response.action === "View All Employees") {
            viewEmployees();
        }
        else if (response.action === "View All Departments") {
            viewDepartments();   
        }
        else if (response.action === "View All Roles") {
            viewRoles();
        }
        else if (response.action === "Add Employee") {
            addEmployee();
        }
        else if (response.action === "Add Department") {
            addDepartment();
        }
        else if (response.action === "Add Role") {
            addRole();
        }
        else if (response.action === "Update Employee Role") {
            // Figure out how to get first/last name of employee's, and assign them to a new role
            updateRole();
        }
        else if (response.action === "Quit App"){
            console.log('Goodbye.');
            connection.end();
        }
    })
}

// Below are a list of convoluted function that let's us view our database in the console 
// create and update our data as well

function viewEmployees() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary FROM employee INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON role.department_id=department.id;', (err, result) => {
        if (err) throw err;
        // console.log(result);
        console.table(result);
        init();
    })
}

function viewDepartments(){
    connection.query('SELECT * FROM employee_db.department;', (err, result) => {
        if (err) throw err;
        // console.log('id   department_name');
        // console.log('---  ---------------');
        console.table(result);
        // result.forEach(({ id, department_name }) => {
        //    console.log(`${id} | ${department_name}`);
        //    console.table()
        // });
        init();
    })
}

function viewRoles(){
    connection.query('SELECT role.*, department.department_name FROM role INNER JOIN department ON role.department_id=department.id;', (err, result) => {
        if(err) throw err;
        // console.log('id  title                 salary  deparment_id  department_name');
        // console.log('--  --------------------  ------  ------------  ---------------');
        // result.forEach(({ id, title, salary, department_id, department_name}) => {
        //     console.log(`${id} | ${title} | ${salary} | ${department_id} | ${department_name}`)
        // });
        console.table(result);
        init();
    });
}

let roles = [];

function fetchRoles(){
    connection.query('SELECT title FROM role', (err, response) => {
        if (err) throw err;
        roles.splice(0, roles.length);
        response.forEach(({title}) =>{
            roles.push(title);
        });
    })
}

function addEmployee(){
    fetchRoles();
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of your employee?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the last name of your employee?',
            name: 'lastName'
        },
        {
            type: "list",
            message: 'What role will your employee undertake?',
            choices: roles,
            name: 'role'
        }
    ]).then((response) => {
        connection.query('SELECT role.id, role.title FROM role', (err, res) => {
            if (err) throw err;
            res.forEach(({id, title})=> {
                if (response.role === title){
                    response.role = id;
                    return response.role;
                }
            });
            connection.query('INSERT INTO employee(first_name, last_name, role_id) VALUES(?, ?, ?)',[response.firstName, response.lastName, response.role], (err, res) => {
                if (err) throw err;
                console.log('Your new employee was successfully added!');
                init();
            })
        })
    })
}

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            message: 'What will your new department be called?',
            name: 'newDepartment'
        }
    ]).then((response) => {
        connection.query('INSERT INTO department(department_name) VALUES (?)', [response.newDepartment], (err, result) =>{
            if (err) throw err;
            viewDepartments();
            console.log('New Department successfully added!');
            init();
        })
    })
}

let departments = [];

function fetchDepartments(){
    connection.query('SELECT department_name FROM department', (err, response) => {
        if (err) throw err;
        departments.splice(0, departments.length);
        response.forEach(({department_name}) =>{
            departments.push(department_name);
        });
    })
}

function addRole(){
    fetchDepartments();
    inquirer.prompt([
        {
            type: 'input',
            message: 'What new role would you like to create?',
            name: 'newRole'
        },
        {
            type: 'input',
            message: 'What is the yearly salary of this new role?',
            name: 'roleSalary'
        },
        {
            type: 'list',
            message: 'What department does this role belong to?',
            choices: departments,
            name: 'roleDepartment'
        },
    ]).then((response) => {
        connection.query('SELECT * FROM department', (err, res) => {
            if (err) throw err;
            res.forEach(({id, department_name})=> {
                if (response.roleDepartment === department_name){
                    response.roleDepartment = id;
                    return response.roleDepartment;
                }
            });
            connection.query('INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?);', [response.newRole, response.roleSalary, response.roleDepartment], (err, res) => {
                if (err) throw err;
                console.log('New role was successfully added!');
                init();
            })
        })
    })
}

let employees = [];


function fetchEmployees(){
    connection.query('SELECT first_name, last_name FROM employee', (err, res) => {
        if (err) throw err;
        employees.splice(0, employees.length);
        res.forEach(({first_name, last_name}) =>{
            let fullName = [];
            
            fullName.splice(0, fullName.length);
            fullName.push(first_name);
            fullName.push(last_name)
            let actualName = fullName.join(" ");
            employees.push(actualName);
        });
    })
}

function updateRole(){
    fetchEmployees();
    inquirer.prompt([
        {
            type: 'confirm',
            message: 'Do you really want to reassign a role?',
            name: 'really'
        },
        {
            type: 'list',
            message: 'Who would you like to reassign to different role?',
            choices: employees,
            name: 'updateRole'
        }
    ]).then((response) => {
        console.log(response.updateRole);
        init();
    })
}

init();