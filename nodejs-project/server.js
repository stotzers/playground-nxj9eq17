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
  var query = "SELECT username, role FROM user where username = '" + username + "' and password = '" + password + "'";

  console.log("Login: " + username);
  console.log("Mot de passe: " + password);
  console.log('Requête à la base de données: ' + query);
//  res.send('<script>logMessage("[INFO] Requête à la base de données: " + query);</script>
//  server.on('connection', socket => {socket.send("Modifie le texte !");});

  db.get(query, function(err, row) {
    if(err) {
      console.log('ERREUR', err);
      res.send('ERREUR'+ '<br /><br /><br /><a href="/index.html">Déconnexion et retour à la page d\'accueil</a>');
     // res.redirect("/index.html#error");
    } else if (!row) {
      //server.on('connection', socket => {socket.send("petit problème d'authentification... <br> voilà...");});
      res.send('Accès non autorisé'+ '<br /><br /><br /><a href="/index.html">Déconnexion et retour à la page d\'accueil</a>');
      //res.redirect("/index.html#unauthorized");
    } else {
      if (row.role=='System Administrator') {
        res.send('Bonjour <b>' + row.username + ',</b><br /> Vous êtes connecté en tant que <b>' + row.role + '<br /><br />Vous avez les pleins pouvoirs sur cette base de données !!!<br /><br /><br /><br /><a href="/index.html">Déconnexion et retour à la page d\'accueil</a>');
      }
      else {
        res.send('Bonjour <b>' + row.username + ',</b><br /> Vous êtes connecté en tant que <b>' + row.role + '<br /><br /><br /><a href="/index.html">Déconnexion et retour à la page d\'accueil</a>');
      }
    }
  });
});

console.log('log: object', {attr: 
	'string content a b c d e f g h i j k'}); 
console.log('log: array', ['array_value1', 'array_value2', 
'array_value3', 'array_value4', 'array_value5']); 
console.log('log: set', new Set([3, 1, 2, 5, 4]));

const fs = require('fs');

const out = fs.createWriteStream('./stdout.log');
const err = fs.createWriteStream('./stderr.log');

const myobject = new console.Console(out, err);

// It will display 'This is the first example' to out
myobject.log('This is the first example');

console.log("Le serveur démarre....");
server.listen(8080, () => console.log("Serveur démarré sur http://localhost:8080"));
const open = require('open');
open('http://localhost:8080'); // Ouvre le navigateur à l'adresse spécifiée



//console.log('TECHIO> open -p 8080 /');
console.log("Le serveur a démarré");

