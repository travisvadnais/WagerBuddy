var db = require("../models");

module.exports = function (app) {

    //This route pulls all active bets that match the user's ID.  Note: 'Active' bet is defined by any bet that hasn't been resolved yet
    app.get('/activebets/:id', function (req, res) {
        // SQL: SELECT * FROM Wagers WHERE (player1=playerid OR player2=playerid) AND (player1win=false AND player2win=false);
        db.Wager.findAll({
            include: [{model: db.User}],
            where: {
                $or: {UserId: req.params.id, player2: req.params.id},
                $and: {player1win: 0,player2win: 0}
            },
            //This will order all the bets from most-recent --> oldest
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(function (dbWager) {
            res.json(dbWager);
        });
    })

    //This route will pull back all of the user's closed bets.  This will allow the front end guys to easily format the bets to show the user visually which bets are open and which are closed
    app.get('/inactivebets/:id', function (req, res) {
        //SQL:  SELECT * FROM Wagers WHERE (player1=playerid OR player2=playerid) AND (player1win=true OR player2win=true);
        db.Wager.findAll({
            include: [{model: db.User}],
            where: {
                $or: {UserId: req.params.id, player2: req.params.id},
                $or: {player1win: 1, player2win: 1}
            },
            //This will order all the bets from most-recent --> oldest
            order: [
                ['createdAt', 'DESC']
            ]
        })
        .then(function (dbWager) {
            res.json(dbWager);
        });
    })

    //Pull back the details of a bet that match that bet ID
    app.get('/bet/:betid', function (req, res) {
        
        //SQL: SELECT * FROM Wagers WHERE id=betid
        db.Wager.findAll({ 
            include: [{model: db.User}],   
            where: {
                id: req.params.betid
            }
        })
        .then(function (dbWager) {
            res.json(dbWager);
        });
    })

    //Allows user to post a new bet to the server
    app.post("/newbet", function (req, res) {
        let player2id = null;
        let player2name = null;
        if (isNaN(req.body.player2)){
            player2id = null
            player2name = req.body.player2
            db.Wager.create({
                title: req.body.title,
                terms: req.body.terms,
                stakes: req.body.stakes,
                settledate: req.body.settledate,
                player1: req.body.UserId,
                player2: player2id,
                player2name: player2name,
                UserId: req.body.UserId
            }).then(function (dbWager) {
                res.json(dbWager);
            })  
        } else {
            player2id = req.body.player2;
            db.User.findAll({where: {id: player2id }}).then(function(dbUser) {
               //console.log(dbUser)
               player2name = dbUser[0].nickname;
               db.Wager.create({
                title: req.body.title,
                terms: req.body.terms,
                stakes: req.body.stakes,
                settledate: req.body.settledate,
                player1: req.body.UserId,
                player2: player2id,
                player2name: player2name,
                UserId: req.body.UserId
                }).then(function (dbWager) {
                res.json(dbWager);
                })     
            })
        }
    });

    //Route allows user to update the bet w/ a winner/loser or a welcher
    app.put('/betupdate/:betid', function (req, res) {
        //SQL: UPDATE Wagers () VALUES () WHERE id=betid;
        let w1 = 0
        let w2 = 0
        let wlch1 = 0
        let wlch2 = 0
        if (req.body.winner == 1){w1 = 1};
        if (req.body.winner == 2){w2 = 1};
        if (req.body.welcher == 1){wlch1 = 1};
        if (req.body.welcher == 2){wlch2 = 1};
        db.Wager.update({
            player1win: w1,
            player2win: w2,
            player1welch: wlch1, 
            player2welch: wlch2
          }, 
          {
            where: {
              id: req.params.betid
            }
          }).then(function(dbWager) {
            res.json(dbWager);
          });
    })
}
