// const mysql = require('mysql2/promise');


// const db=mysql.createPool({
//   host:'localhost',
//   user:'root',
//   password:'Dipak@12345',
//   database:'nodeeccommerseapp',
// })
//  module.exports = db;

//
// const mysql = require('mysql2');


// const db=mysql.createPool({
//   host:'localhost',
//   user:'root',
//   password:'Dipak@12345',
//   database:'nodeeccommerseapp',
// })
//  module.exports = db.promise();
//create connection udssing sequilize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodeeccommerseapp', 'root', 'Dipak@12345', {
  dialect:"mysql",
  host: 'localhost'
});

module.exports = sequelize;