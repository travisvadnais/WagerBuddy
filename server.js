require('dotenv').config()
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 3000;
var automation = require ("./controllers/automation.js")

var db = require("./models");

//================Boilerplate Express stuff==========================//

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));
//==================================================================//


//Handlebars stuff (if we use it)
//===========================================================
app.use(methodOverride("_method"));
app.engine('handlebars',exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
//===========================================================

//Require Routes
require("./routes/users-routes.js")(app);
require("./routes/wagers-routes")(app);

//Sync Sequelize models and start express
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});
