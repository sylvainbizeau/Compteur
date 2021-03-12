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
//Incremantation du compteur ainsi que son affichage
server.get('/', function(req, res) {
    if(req.url == '/favicon.ico') return;
    counter++;
    res.setHeader('Content-Type', 'text/html');
    var monNb = counter.toString();
    var i ;
    for (i = monNb.length; i <= 8; i++) {
        monNb = "0" + monNb;
    }
    var monHtml = '<html>\n' + '<head>\n'  +
                    '<script language="JavaScript" type="text/javascript">\n' +
                    'function NbToClipboard() {\n' +
                        'var t = document.createElement("TEXTAREA");\n' +
                        't.textContent = "' + monNb + '";\n' +
                        'document.body.appendChild(t);\n' +
                        't.select();\n' +
                        'document.execCommand("copy");\n' +
                        't.parentNode.removeChild(t);\n' +
                    '};\n'+
                    //'window.onload = function () {NbToClipboard();};\n' +
                    //"if (document.readyState === 'complete') {\n" +
                    //    'NbToClipboard();\n' +
                    //'} else {\n' +
                    //    "document.addEventListener('DOMContentLoaded', function() {\n" +
                    //        'NbToClipboard();\n' +
                    //    '});\n' +
                    //'}\n' +
                    '</script>\n' + '</head>\n'  +
                    '<body onresize="NbToClipboard()">\n' +
                    '<H3 id="to-copy">' + monNb + '</H3>\n' +
                    '<button id="copy" type="button" onClick="NbToClipboard()">Copier dans le presse-papier</button>\n' +
                    '</body>\n' + '</html>';
    res.status(200).send(monHtml);
});

//Interface pour modifier le numéro du compteur
server.get('/modif', function(req, res) {
    var corp = '<html>' +
                '<script>' +
                'function sendForm() {' + 
                '    var nbCB = document.form1.nbCB.value;' +
                '    var action = document.form1.action;' +
                '    document.form1.action = action + "?nbCB=" + nbCB;' +
                '}' +
                'NbToClipboard();\n' +
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

//Modifie le numéro du compteur
server.post('/maj', function(req, res) {
    console.log(req.body.nbCB.toString());
    counter = req.body.nbCB;
});

//lancer serveur
server.listen(PORT, function(){
    console.log('serveur en écoute sur ' + PORT.toString());
});
