// Dependancies
cosnt mysql = require("mysql");
const inquirer = require("inquirer");

// Stock Variable
const stocl = [];

// Database
const connection = mysql.creatConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazonDB"
});

// Connections to mySQL
connection.connect(function(err){
    if (err) throw err;
});

// Display all items
function displayItems() {
    connection.query('SELECT item_id, product_name, price FROM products', function (err, res) {
        if (err) throw er;
        res.forEach(i => {
            stock.push(String(i.item_id));
            console.log(`${i.item_id} -- ${i.product_name} \n PRICE: ${i.price}`)
            console.log(`-----------------------------------`)
        });
    });
};