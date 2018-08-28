cosnt mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.creatConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazonDB"
});

connection.connect(function(err){
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer.prompt({
        
    })
}