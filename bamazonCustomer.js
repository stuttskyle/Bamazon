// Dependancies
const mysql = require("mysql");
const inquirer = require("inquirer");

// Database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazonDB"
});

// Connections to mySQL
connection.connect(function(err) {
  if (err) throw err;
});

//how much stock the customer is asking to buy
let custStock = [];
//how much the store has on hand
let storeStock = [];
//the item id of the item the customer would like to purchase
let itemId = [];
//how much money the item costs
let howMuch = [];

//prompt to get values for the item id and how many units of the item the customer wants to buy
inquirer
  .prompt([
    {
      name: "productID",
      message: "What is the 'ID Number' of the product you would like to buy?"
    },
    {
      name: "howMany",
      message: "How many would you like to buy?"
    }
  ])
  .then(function(check) {
    if (NaN) {
      throw err;
    }
    //pushes item id to the array above and casts it to an integer
    itemId.push(parseInt(check.productID));
    //pushes how much the customer wants to the array above and casts it to an integer
    custStock.push(parseInt(check.howMany));
    //runs the function and passes through the product ID of the item the customer wants
    findItemID(check.productID);
  });

function findItemID(arg) {
  let query = connection.query(
    `SELECT * FROM products WHERE ?`,
    [
      {
        item_id: arg
      }
    ],
    (err, res) => {
      if (err) {
        throw err;
      }
      //pushes how much the stock of the store has on hand to the above array and casts to an integer
      storeStock.push(parseInt(res[0].stock_quantity));
      //pushes how much the item costs to the above array and casts to an integer with decimal
      howMuch.push(parseFloat(res[0].price));

      //checks to see if the items the customer wants are in stock and if so, it totals their order for them
      if (storeStock[0] >= custStock[0]) {
        //pushes new total of merchandise on hand, after customers purchase to above array
        storeStock.push(storeStock[0] - custStock[0]);
        //multiplies price by how many items the customer wants
        let total = custStock[0] * howMuch[0];
        console.log("Order placed");
        console.log(`Your total will be: $${total}`);
        //runs function to update the stock in the database after the customers purchase
        updateStock();
      } else {
        console.log("Insufficient amount in stock!");
        console.log(`This item has : ${storeStock[0]} in stock!`);
        connection.end();
      }
    }
  );
}
//sends the updated stock on hand to the database and ends the connection
function updateStock() {
  let updateSql = connection.query(
    `UPDATE bamazonDB.products SET stock_quantity = ${
      storeStock[1]
    } WHERE (item_id = ${itemId[0]});`,
    (err, res) => {
      if (err) {
        throw err;
      } else {
        connection.end();
      }
    }
  );
}
