const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'local host',
    port: 3306,
    user: 'root',
    password: 'mh3_Ren!',
    database: 'employees_db'
})

connection.connect(err => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`)
})

function init(){inquirer.prompt([
    {
        type: 'list',
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees By Department", "View All Employees By Role", "Add Employee", "Add Department", "Add Role", "Update Employee Role"],
        name: 'action'
    }
]).then((response) => {
    if (response.action === "View All Employees"){

    }
    else if (response.action === "View All Employees By Department"){

    }
    else if (response.action === "View All Employees By Role"){

    }
    else if (response.action === "Add Employee"){

    }
    else if (response.action === "Add Department"){

    }
    else if (response.action === "Add Role"){

    }
    else if (response.action === "Update Employee Role"){
        
    }
})
}