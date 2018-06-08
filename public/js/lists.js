// Uncomment these one at a time to see what they do:
//createTable("3", "activebets", "#maincontent")
//createTable("3", "inactivebets", "#maincontent")
//localStorage.setItem('wagerbuddy_userId', "1")
//localStorage.clear('wagerbuddy_userId')
// Takes the user id, the type of list (inactivebets or activebets, and the targetDiv from the DOM)
function createTable(id, type, targetDiv) {
    var StaticDiv = $(targetDiv);
    var masterDiv = $("<div>");
    masterDiv.addClass('container')
    var table = $("<table>");
    table.addClass("highlight striped")
    var tableHeader = $("<thead>")
    var headerRow = $("<tr>")
    var tableHead1 = $("<th>")
    tableHead1.html("<i class='small material-icons'>assignment</i><b>Wager</b>")
    var tableHead2 = $("<th>")
    tableHead2.html("<i class='small material-icons'>person</i><b>Between</b>")
    var tableHead3 = $("<th>")
    tableHead3.html("<i class='small material-icons'>timelapse</i><b>Status</b>")
    var tableHead4 = $("<th>")
    tableHead4.text("")
    headerRow.append(tableHead1, tableHead2, tableHead3, tableHead4)
    tableHeader.append(headerRow)
    table.append(tableHeader)
    // calls the API based on type of list
    if (type == 'activebets') {
        masterDiv.prepend("<h2>current wagers</h2>")
        var queryString = "/activebets/" + id;
    } else {
        masterDiv.prepend("<h2>past wagers</h2>")
        var queryString = "/inactivebets/" + id;
    }
    $.ajax({
        url: queryString,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.length; i++) {
            var newRow = createRow(response[i], id, type) // calls row creation function
            table.append(newRow)
        }
    })
    StaticDiv.empty()
    masterDiv.append(table)
    StaticDiv.append(masterDiv);
}

function createRow(data, id, type) {
    var newRow = $("<tr>")
    var td1 = $("<td>")
    var td2 = $("<td>")
    var td3 = $("<td>")
    var td4 = $("<td>")
    td1.text(data.title)
    td2.text(data.User.nickname + " & " + data.player2name)
    // change column 3 based on type of list
    if (type == 'activebets') {
        var betDate = new Date(data.settledate)
        var nowDate = Date.now()
        if (betDate < nowDate) {
            td3.html("<i class='small material-icons'>access_alarm</i>Due")
        } else {
            td3.html("<i class='small material-icons'>access_time</i>Open")
        }
    } else if (type == 'inactivebets') {
        if ((id == data.player1 && data.player1win == 1) || (id == data.player2 && data.player2win == 1)) {
            td3.html("<i class='small material-icons'>mood</i>Win")
        } else {
            td3.html("<i class='small material-icons'>mood_bad</i> Loss")
        }
    }
    // if the user is the owner, give them an update button - otherwise, give them a view button
    if (id == data.player1) {
        td4.html('<a id=' + data.id + '" class="update waves-effect waves-light btn"><i class="tiny material-icons">update</i></a>')
    } else {
        td4.html('<a id=' + data.id + '" class="view waves-effect waves-light btn"><i class="tiny material-icons">visibility</i></a>')
    }
    newRow.append(td1, td2, td3, td4);
    return newRow;
}

function createSummary(wagerID, userID, requestType, targetDiv) {
    var staticDiv = $(targetDiv);
    var MasterDiv = $("<div>")
    MasterDiv.attr("id", wagerID)
    MasterDiv.addClass("container betsummary")
    var queryString = '/bet/' + wagerID;
    $.ajax({
        url: queryString,
        method: "GET",
    }).then(function (response) {
        console.log(response)
        var htmlString = ""
        htmlString += '<i class="medium material-icons">monetization_on</i>'
        htmlString += "<h3>" + response[0].title + "</h3><br>"
        MadeDate = response[0].createdAt.slice(0, 10)
        htmlString += '<b>made: </b>' + MadeDate + '<br>'
        htmlString += "<b>between: </b>" + response[0].User.nickname + " and " +  response[0].player2name + "<br>"
        htmlString += "<b>Terms:</b> " + response[0].terms + "<br>"
        htmlString += "<b>Stakes:</b> " + response[0].stakes + "<br>"
        ResolutionDate = response[0].settledate.slice(0, 10)
        htmlString += '<b>Settle date: </b>' + ResolutionDate + '<br>'
        if (response[0].player1win == true) {
            htmlString += '<i class="small material-icons">mood</i>win<br>'
        } else if (response[0].player2win == true) {
            htmlString += '<i class="small material-icons">mood_bad</i>loss<br>'
        } else {
            var betDate = new Date(response[0].settledate)
            var nowDate = Date.now()
            if (betDate < nowDate) {
                htmlString += "<i class='small material-icons'>access_alarm</i>due<br>"
            } else {
                htmlString += "<i class='small material-icons'>access_time</i>open<br>"
            }
        }
        if (userID == response[0].player1) { //this user is the owner of this wager
            //provide button to call modal
            htmlString += '<a id="updateModal" class="modal-trigger waves-effect waves-light btn" href="#modalUpdate">Update</a>'
            $("#updatebetbutton").attr('data_ID', response[0].id)

        }

        MasterDiv.html(htmlString);
        staticDiv.empty();
        staticDiv.append(MasterDiv)
    })
}


$("#maincontent").on('click', ".view", function () {
    createSummary(this.id, localStorage.getItem('wagerbuddy_userId'), "view", "#maincontent")
})

$("#maincontent").on('click', ".update", function () {
    createSummary(this.id, localStorage.getItem('wagerbuddy_userId'), "update", "#maincontent")
})

$("#updatebetbutton").on('click', function (event) {
    event.preventDefault()
    WagerID = $(this).attr('data_ID')
    var queryString = '/betupdate/' + WagerID;
    var iwinner = 0
    var iwelcher = 0
    for (var i = 0; i < 3; i++) {
        var winString = "#Win" + i;
        var welchString = "#Welch" + i;
        if($(winString).is(":checked")) {
            iwinner = i
        }
         if($(welchString).is(":checked")) {
            iwelcher = i
        }
    }

    $.ajax({
        url: queryString,
        type: 'PUT',
        //method: "PUT",
        data: {
            winner: iwinner,
            welcher: iwelcher
        }
    }).then(function (response) {
        createSummary(WagerID, localStorage.getItem('wagerbuddy_userId'), "update", "#maincontent")
        $("#modalUpdate").modal('close');
    })
})