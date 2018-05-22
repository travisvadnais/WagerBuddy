var mysql = require("mysql");

//Set up mysql credentials

//Connect to JawsDB (after it's hosted on Heroku)
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
 } 
else {
//Otherwise, connect to Mysql locally
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: ""
});
 }

//set up the connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
//export the connection
module.exports = connection;