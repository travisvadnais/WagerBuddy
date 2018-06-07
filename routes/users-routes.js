var db = require("../models");

module.exports = function(app){

    //Combo route.  Will be called in two different scenarios:  new user setup and new-bet setup
    //New user setup is needed to ensure uniqueness in new user name, and new-bet setup is needed to populate the opponent dropdown.
    //Front-end guys can parse out the response depending on the request
    app.get("/names", function(req, res) {
        db.User.findAll({
            order: [
                ['nickname', 'ASC']
            ]
        }).then(function(dbUser) {
            console.log(dbUser);
            res.json(dbUser);
        });
    });

    //Same route as above, except for emails.
    //Will be used for email verification
    app.get("/email", function(req, res) {
        db.User.findAll({}).then(function(dbUser){
            console.log(dbUser);
            res.json(dbUser);
        })
    })

    //This route will post a new user to the DB
    app.post("/newuser", function(req, res) {
        console.log(req.body);
        db.User.create(req.body).then(function(dbUser) {
            res.json(dbUser);
        })
    })

    //This route will grab a user's bet history so he can see his record
    app.get("/record/:id", function(req, res) {
        db.Wager.findAll({
            where: {
                $or: {
                    player1: req.params.id,
                    player2: req.params.id
                }
            }
        })
        .then(function(matchingData) {
            res.json(matchingData)
        })
    })



    
}