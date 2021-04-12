# SQL Injection,

Normalement, on ne devrait pouvoir accéder à une application que si on possède le bon login et le mot de passe correspondant. 
Mais si, comme dans cet exemple, le système est mal protégé, il est alors possible d'y accéder en y injectant du code SQL.

## Exercice
Essayez de vous connecter en tant qu'administrateur au système ci-dessous en y injectant le code SQL adéquat

## Avertissement
Cette page contient une simulation de page d'accès à une application web qui a été créée dans le but d'exercer l'injection de code SQL. Mais attention: d'une manière général, il n'est pas légal de tenter d'accéder à un système en y injectant du code SQL !


# SQL Injection Démo

@[Executer l'applicaton]({ "stubs": ["index.html", "style.css","server.js"], "command": "node server.js" })

