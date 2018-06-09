
createMenu("#maincontent");

function checkUser(){
    
    //=======================================================================//
    //Toggle next line on/off to clear localstorage on page load for testing//
    //localStorage.removeItem('wagerbuddy_userId');
    //=======================================================================//
    console.log(localStorage.getItem('wagerbuddy_userId'));

    //Check to see if there is a nickname cookie.
    if (localStorage.getItem('wagerbuddy_userId') !== null) {
        //If so, notify the user that big brother is watching and we know who they are
        console.log(`Welcome ${localStorage.getItem('wagerbuddy_userId')}`);
    }
    else {
        console.log("you're a new user");
        //Launch the modal for new users ONLY.  The 'dismissible' property will prevent users from exiting modal by clicking outside of it
        $('.modal').modal({dismissible: true});
        $('#modal1').modal('open');

        //Set a listener for the form submit & call the handleNewUser fx
        $(".s10").submit(function(event) {
            //Hide the validators that may have populated on a prior failed registration attempt
            $(".nickname_validation").hide();
            $(".email_validation").hide();
            $(".unique_email").hide();
            //Make IDs easier to use
            var name = $("#user_nickname");
            var userEm = $("#user_email");
        
        //Send form data to the addUser fx & clear fields
        // function handleNewUser(event) {
            event.preventDefault();
            if (!name.val().trim()) {
                return;
            }

            addUser({
                nickname: name
                    .val()
                    .trim(),
                email: userEm
                    .val()
                    .trim()
            });
            name.val("");
            userEm.val("");
        })

        //This will actually add to to the DB
        function addUser(userData) {
            //Check to make sure we have a valid email address
            console.log(userData.email.indexOf("."));
            if (userData.email.indexOf(".") === -1 || userData.email.indexOf("@") === -1) {
                //Show validation <h6> if invalid
                $(".email_validation").show();
            }
            //If it's valid, proceed to the next check, which will check the e/m uniqueness
            else if (checkEmailUniqueness(userData) === false) {
                $(".unique_email").show();
            }
            else {
            //Next, we're going to check the username against the database for uniqueness w/ a GET
            $.get("/names", userData.nickname)
                .then(function(userList) {
                    //Set a toggle w/ a default of TRUE
                    var uniqueName = true;
                    //Loop through the database names
                    for (var i = 0; i < userList.length; i++) {
                        //If there's a match, trigger the validation error & exit the loop
                        if (userData.nickname == userList[i].nickname) {
                            //Show validation <h6> if not unique
                            $(".nickname_validation").show();
                            console.log("pick a new nickname");
                            unique = false;
                            break;
                        }
                    }
                    //If it IS unique, post the username to the DB via POST route
                    if (uniqueName === true) {
                        $.post("/newuser", userData)
                        //API will reply w/ the new user object
                        .then(function(dbUser) {
                            //take the ID from that object and pin to local storage
                            localStorage.setItem('wagerbuddy_userId', dbUser.id)
                            //Close the modal
                            $(".modal").modal('close');
                        })
                    }  //End IF statement            
                }) //End GET.then    
            } //End ELSE statement 
        } //End UserData fx
    }

    //This fx will check DB to make sure e/m isn't already taken.
    function checkEmailUniqueness(userData) {
        //Set a toggle w/ a default of TRUE
        var uniqueEmail = true;
        $.get("/email", userData.email)
            .then(function(userList) {
                //Loop through the database emails
                for (var i = 0; i < userList.length; i++) {
                    //If there's a match, trigger the validation error & exit the loop
                    if (userData.email == userList[i].email) {
                        //Show validation <h6> if not unique
                        $(".unique_email").show();
                        console.log("This email is already taken");
                        uniqueEmail = false;
                        return uniqueEmail;
                        break;
                    }
                }
            })
        return uniqueEmail;
    }
};

function createMenu(targetDiv){
    var staticDiv = $(targetDiv);
    var masterDiv = $("<div>")
    masterDiv.addClass("container")
     //var column1 = $("<col>")
     //column1.addClass("col")
    var row1 = $("<row>")
    row1.addClass("row")
    var column1a = $("<col>")
    column1a.addClass("col s12") 
    column1a.html('<a id="mnewbet" href="#modalbet"class="navbutton waves-effect waves-light btn modal-trigger" ><i class="large material-icons">monetization_on</i><br>NewBet</a>')
    row1.append(column1a)
    
    
    var row2 = $("<row>")
    row2.addClass("row")
    
    
    var column2a = $("<col>")
    column2a.addClass("col s6")
    column2a.html('<a id="minactivebets" class="navbutton waves-effect waves-light btn" ><i class="large material-icons">history</i><br>past</a>')
    row2.append(column2a)
    
    var column2b = $("<col>")
    column2b.addClass("col s6")
    column2b.html('<a id="mactivebets" class="navbutton waves-effect waves-light btn" ><i class="large material-icons">access_time</i><br>current</a>')
    row2.append(column2b)

    // var column2b = $("<col>")
    // column2b.addClass("col s6")
    // column2b.html('<a id="muser" class="navbutton waves-effect waves-light btn modal-trigger" ><i class="large material-icons">person</i><br>user</a>')
    // row2.append(column2b)

    staticDiv.empty();
   // masterDiv.append(column1)
    masterDiv.append(row1)
    masterDiv.append(row2);
    staticDiv.append(masterDiv);
}

$('.modal').modal();
//click events for footer menu
$("#home").on('click',function(){
    createMenu("#maincontent")
})

// $("#newbet").on('click',function(){
//     $('#modalbet').modal();
//     $('#modalbet').modal('show');
// })

$("#activebets").on('click',function(){
    createTable(localStorage.getItem('wagerbuddy_userId'), "activebets", "#maincontent")
})

$("#inactivebets").on('click',function(){
    createTable(localStorage.getItem('wagerbuddy_userId'), "inactivebets", "#maincontent")
})

//Click events for home screen navigation buttons

$("#maincontent").on('click',"#mactivebets",function(){
    createTable(localStorage.getItem('wagerbuddy_userId'), "activebets", "#maincontent")
})

$("#maincontent").on('click',"#minactivebets",function(){
    createTable(localStorage.getItem('wagerbuddy_userId'), "inactivebets", "#maincontent")
})

$("#maincontent").on('click',"#newbet",function(){
    createBet ("#opponent_name")
    $('#modalbet').modal();
    $('#modalbet').modal('show');
})

// $("#nickname").on('click',function(){
//     createbet()
// })




