createBet ("#opponent_name")
function createBet(targetDiv) {
    var StaticDiv = $(targetDiv)
    console.log("drop code ran")
    StaticDiv.attr("list","nicknames")
    var drop = $("<datalist>")
    drop.attr("size","5")
    drop.attr("id","nicknames")
    

    $.get("/names")
        .then(function (userList) {
            for (var i = 0; i < userList.length; i++) {
                var opt = $("<option>")
                opt.attr("value", userList[i].id)
                opt.text(userList[i].nickname)               
                drop.append(opt)
            }
            console.log(drop)
            
            StaticDiv.append(drop)
        })
}

$("#newbetbutton").click('click', function(event){

    event.preventDefault();

    var oppName = $("#opponent_name")
    var date = $("#settle_date")
    var terms = $("#bet_terms")
    var stakes = $("#bet_stakes")

    //need validation
   
    //Hide all the validation fields for re-submits
    $("#oppName_validation").hide();
    $("#oppNameInteger_validation").hide();
    $("#terms_validation").hide();
    $("#stakes_validation").hide();
    $("#settle_date_validation").hide();

    //First check to make sure this is filled out
    console.log(`Your settle date is: ${date.val()}`);
    console.log(oppName.val())
    console.log(validateOppName(oppName.val()));
    if (validateOppName(oppName.val()) === true) {
        //If so, make sure it's not a number
        console.log(typeof parseInt(oppName.val()))
        //Check the opponent name entry and reject it if it's a number
        if (typeof parseInt(oppName.val()) === "number") {
            $("#oppNameInteger_validation").show()
        }
    }
    
    //Check to make sure terms are filled out
    console.log(terms.val())
    if (terms.val() === "") {
        $("#terms_validation").show()
    }
    //Check to make sure stakes are filled out
    if (stakes.val() === "") {
        $("#stakes_validation").show()
    }

    //Check to make sure settle date is filled out
    if (date.val() === "") {
        $("#settle_date_validation").show()
    }
    //If everything passes, start the POST

    else {
        console.log(localStorage.getItem('wagerbuddy_userId'))
        var wagerData = {
            UserId: localStorage.getItem('wagerbuddy_userId'),
            title: $("#bet_title").val().trim(),
            player2: $("#opponent_name").val().trim(),
            settledate: $("#settle_date").val().trim(),
            terms: $("#bet_terms").val().trim(),
            stakes: $("#bet_stakes").val().trim()
        };
        $.post("/newbet", wagerData)
            .then(function(dbWager) {
                $('#modalbet').modal();
                $('#modalbet').modal('close');
                createTable(localStorage.getItem('wagerbuddy_userId'), "activebets", "#maincontent")
            })
            //Hide the <span> validation tags
            $("#oppName_validation").hide();
            $("#oppNameInteger_validation").hide();
            $("#terms_validation").hide();
            $("#stakes_validation").hide()
        }

    function validateOppName(oppName) {
        //fx will ensure this field isn't blank
        if (oppName === "") {
            $("#oppName_validation").show()
            return false
        }
        else {return true}
    }

})