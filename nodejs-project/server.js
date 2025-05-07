// {
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var server = express();
server.use(express.static('.'));
server.use(bodyParser.urlencoded({extended: true}));

var db = new sqlite3.Database(':memory:');
db.serialize(function() {
  db.run("CREATE TABLE user (username TEXT, password TEXT, role TEXT)");
  db.run("INSERT INTO user VALUES ('abel', 'MySecretP@ssWord', 'Normal user')");
  db.run("INSERT INTO user VALUES ('Bruno', 'cool58', 'Normal user')");
  db.run("INSERT INTO user VALUES ('Sophie', 'test123', 'Normal user')");
  db.run("INSERT INTO user VALUES ('admin', 'admin123', 'App Administrator')");
  db.run("INSERT INTO user VALUES ('Roger', 'bac', 'Normal user')");
 });
// }

server.get('/', function(req, res) {
  console.log("/ is called on server");
  res.sendFile(path.join(__dirname + '/index.html'));
});

server.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var query = "SELECT username, role FROM user where username = '" + username + "' and password = '" + password + "'";

  console.log("Login: " + username);
  console.log("Mot de passe: " + password);
  console.log('Requête à la base de données: ' + query);

  db.get(query, function(err, row) {

    if(err) {
      console.log('ERREUR', err);
      res.send('ERREUR'+ '<br /><br /><br /><a href="/index.html">Déconnexion et retour à la page d\'accueil</a>');
     // res.redirect("/index.html#error");
    } else if (!row) {
     res.send('Accès non autorisé'+ '<br /><br /><br /><a href="/index.html">Déconnexion et retour à la page d\'accueil</a>');
      //res.redirect("/index.html#unauthorized");
    } else {
      if (row.role=='App Administrator') {
        res.send('Bonjour, <b>' + row.username + '</b><br /> Vous êtes connecté en tant que <b>' + row.role + '<br /><br />Vous avez les pleins pouvoirs sur cette base de données !!!<br /><br /><br /><br /><a href="/index.html">Déconnexion et retour à la page d\'accueil</a>');
      }
      else {
        res.send('Bonjour, <b>' + row.username + '</b><br /> Vous êtes connecté en tant que <b>' + row.role + '<br /><br /><br /><a href="/index.html">Déconnexion et retour à la page d\'accueil</a>');
      }
    }
  });

});

console.log("Le serveur démarre....");
server.listen(8080);
console.log('TECHIO> open -p 8080 /');
console.log("Le serveur a démarré");

