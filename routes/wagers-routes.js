var db = require("../models");

module.exports = function (app) {

    app.get('/activebets/:id', function (req, res) {
        // SQL: SELECT * FROM Wagers WHERE (player1=playerid OR player2=playerid) AND (player1win=false AND player2win=false);
        db.Wager.findAll({
                where: {
                    $or: {player1: req.params.id, player2: req.params.id},
                    $and: {player1win: 0,player2win: 0}
                }
            })
            .then(function (dbWager) {
                res.json(dbWager);
            });
    })

    app.get('/inactivebets/:id', function (req, res) {
        //SQL:  SELECT * FROM Wagers WHERE (player1=playerid OR player2=playerid) AND (player1win=true OR player2win=true);
        db.Wager.findAll({
                where: {
                    $or: {player1: req.params.id, player2: req.params.id},
                    $or: {player1win: 1, player2win: 1}
                }
            })
            .then(function (dbWager) {
                res.json(dbWager);
            });
    })

    app.get('/bet/:betid', function (req, res) {
        //SQL: SELECT * FROM Wagers WHERE id=betid
        db.Wager.findAll({
                where: {
                    id: req.params.betid
                }
            })
            .then(function (dbWager) {
                res.json(dbWager);
            });
    })

    app.post("/newbet", function (req, res) {
        let player2id = null;
        let player2name = "";
        if (isNaN(req.body.player2)){
            player2name = req.body.player2      
        } else {
            player2id = req.body.player2;
        }
        //SQL:  INSERT INTO Wagers () VALUES ()
        db.Wager.create({
            title: req.body.title,
            terms: req.body.terms,
            stakes: req.body.stakes,
            settledate: req.body.settledate,
            player1: req.body.id,
            player2: player2id,
            player2name: player2name
        }).then(function (dbWager) {
            // returns the new wager 
            res.json(dbWager);
        });
    });

    app.put('/betupdate/:betid', function (req, res) {
        //SQL: UPDATE Wagers () VALUES () WHERE id=betid;
        let w1 = 0
        let w2 = 0
        let wlch1 = 0
        let wlch2 = 0
        if (req.body.winner == 1){w1 = 1};
        if (req.body.winner == 2){w2 = 1};
        if (req.body.welcher == 1){wlch1 = 1} ;
        if (req.body.welcher == 2){wlch2 = 1} ;
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