// Uncomment these one at a time to see what they do:
//createTable("3", "activebets", "#maincontent")
//createTable("3", "inactivebets", "#maincontent")

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
    tableHead2.html("<i class='small material-icons'>person</i><b>With</b>")
    var tableHead3 = $("<th>")
    tableHead3.html("<i class='small material-icons'>timelapse</i><b>Status</b>")
    var tableHead4 = $("<th>")
    tableHead4.text("")
    headerRow.append(tableHead1, tableHead2, tableHead3, tableHead4)
    tableHeader.append(headerRow)
    table.append(tableHeader)
  // calls the API based on type of list
    if (type == 'activebets') {
        masterDiv.prepend("<h2>Active wagers</h2>")
        var queryString = "/activebets/" + id;
    } else {
        masterDiv.prepend("<h2>Inactive wagers</h2>")
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
    td2.text(data.player2name)
    // change column 3 based on type of list
    if (type == 'activebets') {
        var betDate = new Date(data.settledate)
        var nowDate = Date.now()
        if (betDate < nowDate) {
            td3.html("<i class='small material-icons'>access_alarm</i> Overdue")
        } else {
            td3.html("<i class='small material-icons'>access_time</i> Open")
        }
    } else if (type == 'inactivebets') {
        if ((id == data.player1 && data.player1win == 1) || (id == data.player2 && data.player2win == 1)) {
            td3.html("<i class='small material-icons'>mood</i> Win")
        } else {
            td3.html("<i class='small material-icons'>mood_bad</i> Loss")
        }
    }
    // if the user is the owner, give them an update button - otherwise, give them a view button
    if (id == data.player1) {
        td4.html('<a id=' + data.id + '" class="update waves-effect waves-light btn"><i class="material-icons left">update</i>Update</a>')
    } else {
        td4.html('<a id=' + data.id + '" class="view waves-effect waves-light btn"><i class="material-icons left">search</i>View  </a>')
    }
    newRow.append(td1, td2, td3, td4);
    return newRow;
}