
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const {MongoClient} = require("mongodb");

const PORT = process.env.PORT || 5000
const DB_PATH = __dirname + '/db/compteur.txt'

const dbName = "CompteurDb";
const dbColl = "CompteurC";
const dbUser = process.env.DBUSER;
const dbPassword = process.env.DBPASSWORD;
const uri =  "mongodb+srv://"+dbUser+":"+dbPassword+"@cluster0.khy3m.mongodb.net/"+dbName+"?retryWrites=true&w=majority";
const options = {useNewUrlParser: true, useUnifiedTopology: true};

app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
    
app.use(express.static(__dirname + '/static'))

app.get('/nb', (req, res) => {
    Lire().then(V => {
        console.log("Lue: "+V);
        V = (parseInt(V) + 1).toString(); 
            
        for (i=V.length;i<8;i++) {
            V = "0" + V;
        }
        res.send(V);
        Ecrire(V);
    });
  });

app.post('/maj', function(req, res) {
    const nb = req.query.nbCB;
    if (+nb) { // si nombre
        Ecrire(nb);
        var corp = '<html><body>' +
                    '<H1> Numéro de devis mis à jour :<br/>'+nb+'</H1>';
                    '</body></html>';
        res.status(200).send(corp);
        return
    }
    res.status(400).send() // si pas nombre
})

function ValZero (Val) {
    const zero = "0000000";
    var ValS = Val.toString();
    return zero.substring(1, 9 -ValS.length) + ValS;
}

app.post('/list', function(req, res) {
    const nb = req.query.nb;
    if (+nb) { // si nombre
        var Val = Lire();
        Var ValS = ValZero(++Val);
        var i;
        for (i=1;i<nb;i++) {
            ValS = ValS+"<br/>"+ValZero(++Val);
        }
        Ecrire(Val);
        var corp = '<html><body>' +
                    '<H1> Voici la liste des ' + nb + ' numeros demandes :<br/>'+ValS+'</H1>' +
                    '</body></html>';
        res.status(200).send(corp);
        return
    }
    res.status(400).send() // si pas nombre
})

//Interface pour modifier le numéro du compteur
app.get('/modif', function(req, res) {
    var corp = '<html><script>function sendForm() {\n' + 
                '    var nbCB = document.form1.nbCB.value;\nvar action = document.form1.action;\ndocument.form1.action = action + "?nbCB=" + nbCB;\n' +
                '}\n</script><body><form method="post" name="form1" action="/maj">' +
                    '<input placeholder="00001234" name="nbCB" id="nbCB" maxlength="8" type="text" />' +
                    '<input value="Modifier" id="bt" type="submit" onClick="sendForm()" />' + 
                '</form></body></html>';

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(corp);
})

app.listen(PORT, function(){
    console.log('serveur en écoute sur ' + PORT.toString());
})

async function Lire(){
    var Val1;
    const clientL = new MongoClient(uri, options);
    try {
        //console.log("Connection à la base /L");
        await clientL.connect();
        console.log("Connecté à la base /Lecture");

        var coll = clientL.db(dbName).collection(dbColl);
        cursor = coll.find({}).limit(1)
        await cursor.forEach(function(element) {
            Val1 = element.nb;
        });
    } catch (e) {
        console.error(e);
    } finally {
        await clientL.close();
        return Val1;
    }
}

async function Ecrire(Val){
    Val = Val.toString();
    const clientE = new MongoClient(uri, options);
    try {
        //console.log("Connection à la base /E");
        await clientE.connect();
        console.log("Connecté à la base /Ecriture");

        var coll = clientE.db(dbName).collection(dbColl);
        await coll.deleteOne({});
        await coll.insertOne({"nb":Val});
        console.log("Ecrit: "+Val);
    } catch (e) {
        console.error(e);
    } finally {
        await clientE.close();
    }
}
