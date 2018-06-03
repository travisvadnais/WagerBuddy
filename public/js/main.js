$(document).ready(function(){
    
    //=======================================================================//
    //Toggle comments on/off to clear localstorage on page load for testing//
    //localStorage.removeItem('userId');
    //=======================================================================//

    

    //Check to see if there is a nickname cookie.
    if (localStorage.getItem('userId') !== null) {
        //If so, notify the user that big brother is watching and we know who they are
        alert(`Welcome ${localStorage.getItem('userId')}`);
    }
    else {
        alert("you suck");
        $('.modal').modal();
        $('.modal-trigger').modal();
    

    //***************LAUNCH MODAL ONCE WE KNOW WHAT IT IS**************//

        //Make IDs easier to use
        var name = $("#user_nickname");
        var userEm = $("#user_email");

        //Set a listener for the form submit & call the handleNewUser fx
        $(document).on("submit", "#login_form", handleNewUser);
        
        //Send form data to the addUser fx & clear fields
        function handleNewUser(event) {
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
        }

        //This will actually add to to the DB
        function addUser(userData) {
            $.post("/newuser", userData)
                .then(function(dbUser) {
                    //console.log(dbUser.id);
                    localStorage.setItem('userId', dbUser.id)
                })
        }
    }
})