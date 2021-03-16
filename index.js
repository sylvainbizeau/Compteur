
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')

const PORT = process.env.PORT || 5000
const DB_PATH = __dirname + '/db/compteur.txt'

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(express.static(__dirname + '/static'))

var mynb = 0;

app.get('/nb', (req, res) => {
    var content = fs.readFileSync(DB_PATH, 'utf8');
    content = parseInt(content) + 1; 
    content = content.toString();
    fs.writeFileSync(DB_PATH, content);
    console.log(content);
    
    fs.readFile(DB_PATH, 'utf-8', (err, val) => {
        if (err) return res.status(500).send(err);
        //mynb = parseInt(val) + 1;
        res.json({
            nb: val
        })
    })
})

app.post('/maj', function(req, res) {
    console.log(req.query.nbCB)
    const nb = parseInt(req.query.nbCB)
    if (+nb) { // si nombre
        fs.writeFile(DB_PATH, nb.toString(), 'utf-8', (err) => {
            if (err) return res.status(500).send(err)                
            console.log('saved')
        })
        return
    }
    res.status(400).send() // si pas nombre
})

//Interface pour modifier le numéro du compteur
app.get('/modif', function(req, res) {
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
})

app.listen(PORT, function(){
    console.log('serveur en écoute sur ' + PORT.toString());
})
