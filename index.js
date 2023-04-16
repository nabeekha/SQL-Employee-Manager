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

