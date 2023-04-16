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

//function to add departments
function addDept() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Please enter a department'
        }
    ])
    .then(async(data) => {
        await connection.promise().query(`INSERT INTO department (name) VALUES('${data.department}')`)
        viewAllDepartments()
    })
}

//change to add role
function addRole() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter a role to add'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Please enter a salary for the above role'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Select the department for the new role:',
            choices: async()=> {
                //fetch the list of departments
                const [departments] = await connection.promise().query('SELECT * FROM department')
                //map dept names to an array
                return departments.map((department)=> ({
                    name: department.name,
                    value: department.id,
                }))
            }
        }
    ])
    .then(async(data) => {
        await connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES('${data.title}', '${data.salary}', '${data.department}')`)
        viewAllRoles()
    })
}

//change to add employee
function addEmployee() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Please enter a first name for the employee'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Please enter a last name for the employee'
        },
        {
            type: 'input',
            name: 'roleID',
            message: 'Please enter a role ID for the employee',
            choices: async()=> {
                //fetch the list of roles
                const [roles] = await connection.promise().query('SELECT * FROM role')
                //map dept names to an array
                return roles.map((role)=> ({
                    name: role.title,
                    value: role.id,
                }))
            }
        },
        {
            type: 'input',
            name: 'managerID',
            message: 'Please enter a manager for the employee',
        },
    ])
    .then(async(data) => {
        await connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${data.firstName}', '${data.lastName}', '${data.roleID}', '${data.managerID}')`)
        viewAllEmployees()
    })
}

