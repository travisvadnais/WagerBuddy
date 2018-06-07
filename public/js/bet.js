
function createbet(){
   
    var drop = $("<select>")
    

    $.get("/names", userData.nickname)
    .then(function(userList) {

        for(var i; i < userList.length;i ++){
        var opt = $("<option>")
        opt.attr("value", userList[i].id)
        opt.text(userList[i].nickname)
        drop.append(opt)        
       }
})


}


