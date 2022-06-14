
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//instalacion de express, body parser y mongo
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const mydb = "planetExpressMongo";
// const coleccion = "Libros";

const url = "mongodb://localhost:27017/";

// dónde cargar los archivos estáticos
app.use(express.static('public'));



app.set('view engine', 'ejs');

// var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res) {
    res.render('landingPage');
});

// app.post('/tracking',urlencodedParser, (req, res) => {
//     res.sendFile('/tracking.html');
// }); 

// app.post('/registro', urlencodedParser, (req, res) => {
//     res.sendFile('/registro.html');
// });


// app.post('/login',urlencodedParser, (req, res) => {
//     res.sendFile('/login.html');
// });
    app.listen(3000);