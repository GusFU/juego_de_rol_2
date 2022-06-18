
//IMPORTAMOS LAS FUNCIONES
const funciones = require("./funciones/funciones.js");

//CONEXION CON SQL esto está tambien en FUNCIONES.JS
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Personas'
});


//express
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//instalacion de express, body parser y mongo
const mongo = require('mongodb');
const funciones1 = require("./funciones/funciones.js");
const MongoClient = mongo.MongoClient;
const mydb = "planetExpressMongo";
const pug = require('pug');
const templateCompiler = pug.compileFile('./views/login.pug');



const url = "mongodb://localhost:27017/";

// dónde cargar los archivos estáticos
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('view engine', 'pug');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

//ENRUTAMIENTOS MEDIANTE METODO GET

app.get('/', function (req, res) {
    res.render('landingPage.ejs');
});

app.get('/landingPage', urlencodedParser, (req, res) => {
    res.render('landingPage.ejs');
});


app.get('/login', urlencodedParser, (req, res) => {
    res.render('login.ejs');
});

app.get('/registro', urlencodedParser, (req, res) => {
    res.render('registro.ejs');
});

app.get('/place_order', urlencodedParser, (req, res) => {
    res.render('place_order.ejs');
});

app.get('/pago', urlencodedParser, (req, res) => {
    res.render('pago.ejs');
});

app.get('/tracking', urlencodedParser, (req, res) => {
    res.render('tracking.ejs');
});

app.get('/contact', urlencodedParser, (req, res) => {
    res.render('contact.ejs');
});

//ENRUTAMIENTOS MEDIANTE METODO POST

app.post('/login', urlencodedParser, (req, res) => {


    let query = 'SELECT * from Login';
    connection.query(query, async (err, rows) => {
        if (err) throw err;


        let comprobacion = await funciones.confirmarLogin(req.body.emailus, req.body.contrasenaus, rows);

        if (comprobacion) {
            connection.end();
            res.render('profile');

        } else {

            var fallo = 'Usuario o contraseña erróneos' 

            res.render('loginMal.ejs', { mensaje: fallo })
        }



    });

});



app.listen(3000);