$(document).ready(function(){

//splash screen
    function splash(param) {
        setTimeout(function () {
          document.getElementById('splashscreen').style.display = 'none';
        }, param);
      }
//modal for buttons
$('.modal').modal();
$('.modal-trigger').leadModal();
    
    //=======================================================================//
    //This whole doc is just a placeholder so I can test the newUser route.  
    //We can delete/modify as necessary
    //=======================================================================//

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
                console.log(dbUser);
            })
    }
})