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
        $('.modal').modal({dismissible: false});
        $('#modal1').modal('open');

        //Set a listener for the form submit & call the handleNewUser fx
        $(".s10").submit(function(event) {
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
            //If it's valid, proceed to the next check
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
};
$('.modal').modal();
