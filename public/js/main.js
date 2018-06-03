function checkUser(){
    
    //=======================================================================//
    //Toggle next line on/off to clear localstorage on page load for testing//
    //localStorage.removeItem('userId');
    //=======================================================================//
 

    //Check to see if there is a nickname cookie.
    if (localStorage.getItem('userId') !== null) {
        //If so, notify the user that big brother is watching and we know who they are
        console.log(`Welcome ${localStorage.getItem('userId')}`);
    }
    else {
        console.log("you're a new user");
        //Launch the modal for new users ONLY
        $('.modal').modal();
        $('.modal').modal('open');

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
            //Send the user data via the api route
            $.post("/newuser", userData)
                //API will reply w/ the new user object
                .then(function(dbUser) {
                    //take the ID from that object and pin to local storage
                    localStorage.setItem('userId', dbUser.id)
                    //Close the modal
                    $(".modal").modal('close');
                })
        }
    }
};