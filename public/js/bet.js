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

$("#newbetbutton").click('click', function(){
   //need validation
   
   
   
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



})