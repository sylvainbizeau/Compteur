
// importation
var express = require('express')

//instance serveur
var server = express();

// Varriable
var counter = 0;

//config racine
server.get('/', function(req, res) {
    //if(req.url == '/favicon.ico') return;
    //res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
    counter++;
    //res.write(counter);
    //res.end();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(counter.toString())
});

//lancer serveur
server.listen(1000, function(){
    console.log('serveur en écoute');
});
