var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var server = express();
server.use(express.static('.'));
server.use(bodyParser.urlencoded({extended: true}));

var db = new sqlite3.Database(':memory:');
db.serialize(function() {
  db.run("CREATE TABLE user (username TEXT, password TEXT, role TEXT)");
  db.run("INSERT INTO user VALUES ('abel', 'MySecretP@ssWord', 'Standard  user')");
  db.run("INSERT INTO user VALUES ('bruno', 'cool58', 'Standard  user')");
  db.run("INSERT INTO user VALUES ('sophie', 'test123', 'Standard  user')");
  db.run("INSERT INTO user VALUES ('admin', 'admin123', 'System Administrator')");
  db.run("INSERT INTO user VALUES ('roger', 'cabac', 'Standard  user')");
 });

server.get('/', function(req, res) {
  console.log("/ is called on server");
  res.sendFile(path.join(__dirname + '/index.html'));
});

server.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var query = "SELECT username, role FROM user "+ CHAR (10)+" where username = '" + username + "' and password = '" + password + "'";

  console.log("Login: " + username);
  console.log("Mot de passe: " + password);
  console.log('Requête à la base de données: ' + query);

  db.get(query, function(err, row) {
    if(err) {
      console.log('ERREUR', err);
        msg = 'ERREUR';
    } else if (!row) {
      //server.on('connection', socket => {socket.send("petit problème d'authentification... <br> voilà...");});
        msg = 'Accès non autorisé';
    } else {
      if (row.role=='System Administrator') {
        msg = 'Bonjour <b>' + row.username + ',</b><br /> Vous êtes connecté en tant que <b>' + row.role + '<br /><br />Vous avez les pleins pouvoirs sur cette base de données !!!<br /><br /><br /><br /><a href="/index.html">Déconnexion et retour à la page d\'accueil</a>';
      }
      else {
        msg = 'Bonjour <b>' + row.username + ',</b><br /> Vous êtes connecté en tant que <b>' + row.role + '</b><br /><br /><br /><a href="/index.html">Déconnexion et retour à la page d\'accueil</a>';
      }
    }
	  res.send('<link rel="stylesheet" type="text/css" href="style.css">' + msg 
		   	+ '<br /><br /><br /><a href="/index.html">Déconnexion et retour à la page d\'accueil</a> <br /><br />'
		        +'<div id="myConsole" style="font-family: Courier, monospace;  background-color: #f5f5f5; margin: 0;    padding: 10px;    width: 90%;    height: 200px;    border: 1px solid #ccc;    overflow-y: auto;    font-size: 14px;">'
		   	+'Requête à la base de données: <br/><b>' + query + '</b></div>');
  });
});

console.log("Le serveur démarre....");
server.listen(8080);
console.log('TECHIO> open -p 8080 /');
console.log("Le serveur a démarré");

