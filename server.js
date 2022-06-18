
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
//variables
var loginmal = true


//express, pug, body parser
const pug = require('pug');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//instalacion de express, body parser y mongo
const mongo = require('mongodb');
const funciones1 = require("./funciones/funciones.js");
const MongoClient = mongo.MongoClient;
const mydb = "planetExpressMongo";


const url = "mongodb://localhost:27017/";

// dónde cargar los archivos estáticos
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('view engine', 'pug');




var urlencodedParser = bodyParser.urlencoded({ extended: false })

//ENRUTAMIENTOS MEDIANTE METODO GET

// app.get('/', (req, res) => {//este es con PUG
//     res.render('history'); // Se muestra la plantilla view.pug
//     });



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

app.get('/profile', (req, res) => {//este es con PUG
    res.render('profile.pug'); // Se muestra la plantilla view.pug
});

app.get('/history', (req, res) => {//este es con PUG
    res.render('history.pug'); // Se muestra la plantilla view.pug
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
            res.render('profile.ejs');

        } else {
            // showPrompt("Escribe algo<br>...inteligente :)")
           // var alerta="Esta mal el log"
            res.render('login.ejs')
        }



    });

});





app.post('/registro', urlencodedParser, (req, res) => {
    let query = 'SELECT email from Usuarios';
    connection.query(query, async (err, rows) => {
        if (err) throw err;


        let comprobacionreg = await funciones.registrar(req.body.dni1, req.body.email1, rows);

        if (!comprobacionreg) {


            let insertQuery = 'INSERT INTO Usuarios (id, nombre, dni,administrador, telefono, email, direccion1, direccion2, direccion3) VALUES (?)';
            let query2 = mysql.format(insertQuery, ["Usuarios", "NULL", req.body.name1, req.body.dni1, false, req.body.telefono1, req.body.email1, req.body.direccion1, req.body.direccion2, req.body.direccion3]);

            connection.query(query2, (err, response) => {
                if (err) throw err;
                console.log(response.insertId);
                //connection.end();
            });



            connection.end();
            res.render('profile');

        } else {


            res.render('registro')
        }



    });

});



//PUG PUG PUG PUG PUG PUG PUG PUG PUG PUG PUG PUG PUG PUG PUG

// Import the pug module
// const pug = require('pug');

// Compile the template (with the data not yet inserted)
// const templateCompiler = pug.compileFile('view.pug');

app.listen(3000);