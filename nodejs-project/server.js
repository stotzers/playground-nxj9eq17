// {
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var server = express();
server.use(express.static('.'));
server.use(bodyParser.urlencoded({extended: true}));

var db = new sqlite3.Database(':memory:');
db.serialize(function() {
  db.run("CREATE TABLE user (username TEXT, password TEXT, name TEXT)");
  db.run("INSERT INTO user VALUES ('user1', 'cool58', 'Normal user')");
  db.run("INSERT INTO user VALUES ('user2', 'test123', 'Normal user')");
  db.run("INSERT INTO user VALUES ('admin', 'admin123', 'App Administrator')");
  db.run("INSERT INTO user VALUES ('user3', 'MyTes$t', 'Normal user')");
 });
// }

server.get('/', function(req, res) {
  console.log("/ is called on server");
  res.sendFile(path.join(__dirname + '/index.html'));
});

server.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var query = "SELECT name FROM user where username = '" + username + "' and password = '" + password + "'";

  console.log("Login: " + username);
  console.log("Mot de passe: " + password);
  console.log('Requête à la base de données: ' + query);

  db.get(query, function(err, row) {

    if(err) {
      console.log('ERREUR', err);
      res.redirect("/index.html#error");
    } else if (!row) {
      res.redirect("/index.html#unauthorized");
    } else {
      res.send('Bonjour, <b>' + row.username + '</b> Vous êtes connecté en tant que <b>' + row.name + '<br /><br />');
      res.send('Bonjour, <b>' + row.name + '</b><br /><a href="/index.html">Retour à la page d\'accueil</a>');
    }
  });

});

console.log("Le serveur démarre....");
server.listen(8080);
console.log('TECHIO> open -p 8080 /');
console.log("Le serveur a démarré");

