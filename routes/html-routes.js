var path = require("path");

module.exports = function(app) {

  //This is just a placeholder so I can test routes.  We can render whatever page we want  
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, '../public/front/main.html'));
  });

}