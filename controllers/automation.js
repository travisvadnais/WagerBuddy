sendMail = require("./mail.js")
schedule = require("node-schedule")
var db = require("../models");



schedule.scheduleJob('00 07 * * *', () => { 
    //Runs once a day,  at 7 AM every morning.  
    // will check database for bet due date, and send a 'time to square up' email 
    
    db.Wager.findAll({include: [{model: db.User}]})
    .then(function (dbWager) {
        //console.log(dbWager)
        var nowdate = new Date().toISOString();
        var fnowdate = nowdate.slice(0, 10);
        for (var i = 0; i < dbWager.length; i++){
            var nsettledate = dbWager[i].settledate
            var fsettledate = nsettledate.toISOString()
            var ffsettledate = fsettledate.slice(0, 10);
             if(ffsettledate == fnowdate){
                // calls function that builds and sends email
                sendSettleUP(dbWager[i])
             }
        }
    })
 })

 function sendSettleUP(data){
    var textString = "";
    textString += 'time to settle up!\n'
    textString += 'Your bet about: ' + data.title +  ' is due today!\n'
    textString += 'The terms are: ' + data.terms +  '\n'
    textString += 'the stakes are: ' + data.stakes +  '\n'
    textString += 'the bet was between you and ' + data.player2name + '\n'

     sendMail(data.User.email,'Time to settle up!', textString)

 }

