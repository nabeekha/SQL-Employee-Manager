//defining initial require packages
const inquirer = require('inquirer')
const fs = require('fs')
const mysql = require('mysql2')
const cTable = require('console.table')

//create db connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'cms_db',
    //change password
    password: 'root'
})

//setting up initial prompt
function init(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'work',
            message: 'Please choose what you would like to complete',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit']
        }
    ])
    .then((data)=> {
        //using switch, which is similar to if but uses one value to check across multiple things
        switch (data.work) {
            case 'view all departments':
                viewAllDepartments()
            break;
            case 'view all roles':
                viewAllRoles()
                break;
            //repeat for all other steps
            case 'view all employees':
                viewAllEmployees()
            break;
            case 'add a department':
                addDept()
            break;
            case 'add a role':
                addRole()
            break;
            case 'add an employee':
                //console.log("test")
                addEmployee()
            break;
            case 'update an employee role':
                updateRole()
            break;
            case 'quit':
                process.exit()
            default:
                //kills command if there are no options selected
                process.exit()
        }
    })
}

//set up functions for each option and do a new inquirer prompt in each 
async function viewAllDepartments() {
    const [departments] = await connection.promise().query('SELECT * FROM department')
    console.table(departments)
    init()
}

async function viewAllRoles() {
    const [roles] = await connection.promise().query('SELECT * FROM role')
    console.table(roles)
    init()
}

async function viewAllEmployees() {
    const [employees] = await connection.promise().query('SELECT * FROM employee')
    console.table(employees)
    init()
}

