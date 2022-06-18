
//IMPORTAMOS EL ARCHIVO QUE COINTIENE LAS FUNCIONES
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
var login3;
var datosEnvioOrigen;
var datosEnvioDestino;
var datosPaquete;
var datosPago;
var importe = 0;
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

// dónde cargar los archivos estáticos PARA HACER css, mapa...
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('view engine', 'pug');




var urlencodedParser = bodyParser.urlencoded({ extended: false }) //para coger elementos de req.body...

//ENRUTAMIENTOS MEDIANTE METODO GET
//para redireccionar de un enlace a otro enpoint.

app.get('/', function (req, res) {
    res.render('./pages/landingPage.ejs');
});

app.get('/landingPage', urlencodedParser, (req, res) => {
    res.render('./pages/landingPage.ejs');
});


app.get('/login', urlencodedParser, (req, res) => {
    res.render('./pages/login.ejs');
});

app.get('/registro', urlencodedParser, (req, res) => {
    res.render('./pages/registro.ejs');

});

app.get('/place_order', urlencodedParser, (req, res) => {
    res.render('./pages/place_order.ejs');
});


app.get('/tracking', urlencodedParser, (req, res) => {
    res.render('./pages/tracking.ejs');
});

app.get('/contact', urlencodedParser, (req, res) => {
    res.render('./pages/contact.ejs');
});

app.get('/profile', (req, res) => {//este es con PUG
    res.render('./pages/profile.pug'); // Se muestra la plantilla view.pug
});

app.get('/history', (req, res) => {//este es con PUG
    res.render('./pages/history.pug'); // Se muestra la plantilla view.pug
});


app.get('/pago', urlencodedParser, (req, res) => {
    res.render('./pages/pago.ejs');
});






//ENRUTAMIENTOS MEDIANTE METODO POST hemos puesto aqui post porque los datos son sensibles.
//No solamente redirecciona, sino que se aplica un cambio

app.post('/login', urlencodedParser, (req, res) => {


    let query = 'SELECT * from Login';
    connection.query(query, async (err, rows) => {
        if (err) throw err;


        let comprobacion = await funciones.confirmarLogin(req.body.emailus, req.body.contrasenaus, rows);

        if (comprobacion) {


            let query = "SELECT * from Usuarios";

            connection.query(query, async (err, rows) => {
                if (err) throw err;

                await funciones.todoUsuario(req.body.emailus, rows)
                let cont = funciones.todoUsuario(req.body.emailus, rows)


                login3 = await rows[cont]

            });

            connection.end();
            res.render('./pages/profile.pug');


        } else {
            // showPrompt("Escribe algo<br>...inteligente :)")
            // var alerta="Esta mal el log"
            res.render('./pages/login.ejs')
        }

    });

});





app.post('/registro', urlencodedParser, (req, res) => {
    let query = 'SELECT email from Usuarios';
    connection.query(query, async (err, rows) => {
        if (err) throw err;


        let comprobacionreg = await funciones.registrar(req.body.dni1, req.body.email1, rows);

        if (!comprobacionreg) {


            let insertQuery = `INSERT INTO Usuarios  VALUES (NULL, '${req.body.name1}', '${req.body.dni1}', false,'${req.body.telefono1}', '${req.body.email1}', '${req.body.direccion1}', '${req.body.direccion2}', '${req.body.direccion3}')`;
            /*             INSERT INTO tabla VALUES(valor1, valor2...valorN)
                        INSERT INTO clientes VALUES(NULL, 'Pedro Pérez'...); */
            // var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";

            console.log(insertQuery);

            connection.query(insertQuery, (err, response) => {
                if (err) throw err;
                console.log(response.insertId);
                //connection.end();
            });


            connection.end();
            res.render('./pages/login.ejs');

        } else {


            res.render('./pages/registro.ejs')
        }


    });

});


app.post('/place_order', urlencodedParser, (req, res) => {


    //coge los datos inputs del formulario de origen
    datosEnvioOrigen = {
        "nombre": `${login3.nombre}`,
        "dni": `${login3.dni}`,
        "telefono": `${login3.telefono}`,
        "email": `${login3.email}`,
        "direccion": `${req.body.direccionOrigen}`,
        "cp": `${req.body.codigoPostal}`
    };

    //coge los datos inputs del formulario de destino

    datosEnvioDestino = {
        "nombre": `${req.body.nombreDestino}`,
        "telefono": `${req.body.telefonoDestino}`,
        "dni": `${login3.dni}`,
        "direccion": `${req.body.direccionDestino}`,
        "cp": `${req.body.codigoPostalDestino}`
    };


    datosPaquete = {
        "peso": `${req.body.peso}`,
        "alto": `${req.body.alto}`,
        "largo": `${req.body.largo}`,
        "ancho": `${req.body.ancho}`
    }


    importe = funciones.precio(req.body.peso, req.body.alto, req.body.largo, req.body.ancho);

    //valor es el nombre de la clave del JSON
    res.render('./pages/pago.ejs', { valor: ` ${importe} €` })
});



//PAGO, al darle a pagar tiene que insertarse en la BBDD de SQL.
//El numero de targeta 
app.post('/pago', urlencodedParser, (req, res) => {

    datosPago = {
        "tituTarjeta": `${req.body.ntituTarjeta}`,
        "numTarjeta": `${req.body.numTarjeta}`,
        "cadTarjeta": `${req.body.cadTarjeta}`,
        "cvv": `${req.body.cvv}`

    }

    let insertQuery = 'INSERT INTO ?? (??) VALUES (?)';
    let query2 = mysql.format(insertQuery, ["tarjetas", "campoTexto", "Añadido desde Node"]);
    //  var query2 = "INSERT INTO customers (tarjetas, address) VALUES ('Company Inc', 'copos 37')";
    connection.query(query2, (err, response) => {
        if (err) throw err;
        console.log(response.insertId);
        //connection.end();
    });




    res.render('./pages/profile.pug')

});



app.listen(3000);