
//IMPORTAMOS LAS FUNVIONES
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
// const coleccion = "Libros";

const url = "mongodb://localhost:27017/";

// dónde cargar los archivos estáticos
app.use(express.static('public'));

app.set('view engine', 'ejs');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

//ENRUTAMIENTOS MEDIANTE METODO GET

app.get('/', function (req, res) {
    res.render('landingPage');
});

app.get('/landingPage', urlencodedParser, (req, res) => {
    res.render('landingPage');
});


app.get('/login', urlencodedParser, (req, res) => {
    res.render('login');
});

app.get('/registro', urlencodedParser, (req, res) => {
    res.render('registro');
});

app.get('/place_order', urlencodedParser, (req, res) => {
    res.render('place_order');
});

app.get('/pago', urlencodedParser, (req, res) => {
    res.render('pago');
});

app.get('/tracking', urlencodedParser, (req, res) => {
    res.render('tracking');
});

app.get('/contact', urlencodedParser, (req, res) => {
    res.render('contact');
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


            res.render('login')
        }

 

    });
   
});



app.listen(3000);