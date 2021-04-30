# SQL Injection,

Normalement, on ne devrait pouvoir accéder à une application que si on possède le bon login et le mot de passe correspondant. 
Mais si, comme dans cet exemple, le système est mal protégé, il est alors possible d'y accéder en y injectant du code SQL.

## Exercices
1)	Essayer de déterminer un nom d’utilisateur de cette base de données.
2)	Déterminer un utilisateur qui soit un administrateur du système, c’est-à-dire qui ait tous les droits sur la base de données.
    Les administrateurs ont habituellement un nom du type ‘administrateur’, ‘administrator’, ‘admin’, ‘superuser’,…
3)	Connectez-vous au système en tant qu’administrateur.
4)	Déterminer le mot de passe de l’utilisateur dont le login est ‘Roger’ avec la méthode des LIKE. Pour ceci, sachez que ce mot de passe contient entre 2 et 5 lettres choisie parmi les 3 premières lettres de l’alphabet : a, b et c.


## Avertissement
Cette page contient une simulation de page d'accès à une application web qui a été créée dans le but d'exercer l'injection de code SQL. Mais attention: d'une manière général, il n'est pas légal de tenter d'accéder à un système en y injectant du code SQL !


# SQL Injection Démo

@[Executer l'applicaton]({ "command": "node server.js" })

