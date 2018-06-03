$(document).ready(function(){

    //Make IDs easier to use
    var title = $("#bet_title");
    var oppName = $("#opponent_name");
    var date = $("#settle_date");
    var terms = $("#bet_terms");
    var stakes = $("#bet_stakes");
    //Pull the info from local storage
    var id = localStorage.getItem("userId");

    //Set up the listener for the form submit
    $(document).on("submit", "#new_bet", handleNewWager);

    function handleNewWager(event) {
        //Prevent page from reloading
        event.preventDefault();

        var wagerData = {
            id: id,
            title: title
                .val()
                .trim(),
            player2name: oppName
                .val()
                .trim(),
            settledate: date,
            terms: terms
                .val()
                .trim(),
            stakes: stakes
                .val()
                .trim()
        };
        $.post("/newbet", wagerData)
            .then(function(dbWager) {
                console.log(dbWager)
            })
        //Clear all the values after 'Submit' pressed
        title.val("");
        player2name.val("");
        settledate.val("");
        terms.val("");
        stakes.val("");
    }
});