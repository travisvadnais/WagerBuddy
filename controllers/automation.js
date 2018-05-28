sendMail = require("./mail.js")
schedule = require("node-schedule")

schedule.scheduleJob('0 7 * * *', () => { 
    //Runs once a day,  at 7 AM every morning.  
    // will check database for bet due date, and send a 'time to square up' email 
    //sendMail('mwroskam@gmail.com','test from schedule','<b>test</b>','test')
 })
