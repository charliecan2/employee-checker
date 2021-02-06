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
            renderDepartments();   
        }
        else if (response.action === "View All Roles") {
            renderRoles();
        }
        else if (response.action === "Add Employee") {
            console.log('This feature is not available yet.')
        }
        else if (response.action === "Add Department") {
            console.log('This feature is not available yet.')
        }
        else if (response.action === "Add Role") {
            console.log('This feature is not available yet.')
        }
        else if (response.action === "Update Employee Role") {
            console.log('This feature is not available yet.')
        }
        else if (response.action === "Quit App"){
            console.log('Goodbye.');
            connection.end();
        }
    })
}

function viewEmployees() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary FROM employee INNER JOIN role ON employee.role_id=role.role_id INNER JOIN department ON role.department_id=department.department_id;', (err, result) => {
        if (err) throw err;
        // console.log(result);
        console.log('id  first_name  last_name  title              department  salary')
        console.log('--  ----------  ---------  -----------------  ----------  ------')
        result.forEach(({ id, first_name, last_name, title, department_name, salary}) => {
            console.log(`${id} | ${first_name} | ${last_name} | ${title} | ${department_name} | ${salary}`)
        });
        init();
    })
}

function renderDepartments(){
    connection.query('SELECT * FROM employee_db.department;', (err, result) => {
        if (err) throw err;
        console.log('id   department_name');
        console.log('---  ---------------');
        result.forEach(({ department_id, department_name }) => {
           console.log(`${department_id} | ${department_name}`)
        });
        init();
    })
}

function renderRoles(){
    connection.query('SELECT * FROM employee_db.role', (err, result) => {
        if(err) throw err;
        console.log('id  title                 salary  deparment_id');
        console.log('--  --------------------  ------  ------------');
        result.forEach(({ role_id, title, salary, department_id}) => {
            console.log(`${role_id} | ${title} | ${salary} | ${department_id}`)
        });
        init();
    });
}

function addEmployee(){

}

init();