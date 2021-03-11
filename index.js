// importation
var express = require('express');
var bodyParser = require('body-parser');

//instance serveur
var server = express();
server.use(bodyParser.urlencoded({ extended: true }));

// Variable
var counter = 0;

// Constante
const PORT = process.env.PORT || 5000

//config racine
server.get('/', function(req, res) {
    if(req.url == '/favicon.ico') return;
    counter++;
    res.setHeader('Content-Type', 'text/html');
    var monNb = counter.toString();
    var i ;
    for (i = monNb.length; i <= 8; i++) {
        monNb = "0" + monNb;
    }
    monNb = "<h1 d='nbCB'>" + monNb + "</h1>"
    res.status(200).send(monNb);
});
server.get('/modif', function(req, res) {
    var corp = '<html>' +
                '<script>' +
                'function sendForm() {' + 
                '    var nbCB = document.form1.nbCB.value;' +
                '    var action = document.form1.action;' +
                '    document.form1.action = action + "?nbCB=" + nbCB;' +
                '}' +
                '</script>' + 
                '<body>' +
                '<form method="post" name="form1" action="/maj">' +
                    '<input placeholder="00001234" name="nbCB" id="nbCB" maxlength="8" type="text" />' +
                    '<input value="Modifier" id="bt" type="submit" onClick="sendForm()" />' + 
                '</form>';
                '</body>' + 
                '</html>';

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(corp);
});

server.post('/maj', function(req, res) {
    console.log(req.body.nbCB.toString());
    counter = req.body.nbCB;
});

//lancer serveur
server.listen(PORT, function(){
    console.log('serveur en écoute sur ' + PORT.toString());
});
