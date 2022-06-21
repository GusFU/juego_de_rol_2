
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
var pedidos
var loginmal = true
var login3;
var datosEnvioOrigen;
var datosEnvioDestino;
var datosPaquete;
var datosPago;
var importe = 0;
var hoy;
var idPaquete;
var myobj;
var info_usuarios;

//express, pug, body parser
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//instalacion de express, body parser y mongo
//BBDD de mongoDB, se declaran las variables para insertar en la coleccion que se llama envios.
const mongo = require('mongodb');
const funciones1 = require("./funciones/funciones.js");
const MongoClient = mongo.MongoClient;
const mydb = "planetExpressMongo";
const pug = require('pug');
//const templateCompiler = pug.compileFile('./views/login.pug');
const url = "mongodb://localhost:27017/";
const coleccion = "Envios";


// Aqui es de dónde cargar los archivos estáticos PARA HACER css, mapa...
app.use(express.static('public')); //enroutamientos
app.set('view engine', 'ejs');//paginas EJS
app.set('view engine', 'pug');//PUG
// app.set('view engine', 'html');
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
app.get('/profile', (req, res) => {//esta vista está hecha con PUG
    res.render('./pages/profile.pug'); // Se muestra la plantilla view.pug
});
app.get('/history', (req, res) => {//esta vista está hecha con PUG
    res.render('./pages/history.pug'); // Se muestra la plantilla view.pug
});
app.get('/pago', urlencodedParser, (req, res) => {
    res.render('./pages/pago.ejs');
});
app.get('/admin', urlencodedParser, (req, res) => {
    res.render('./pages/admin.ejs');
});

//ENRUTAMIENTOS MEDIANTE METODO POST hemos puesto aqui POST porque los datos son sensibles.
//No solamente redirecciona, sino que se aplica un cambio al ejecutarse el botón SUBMITT.
app.post('/login', urlencodedParser, (req, res) => { //CONEXION CON SQL DB
    let query = 'SELECT * from Login';
    connection.query(query, async (err, rows) => {
        if (err) throw err;
        info_login = await rows;

        let comprobacion = funciones.confirmarLogin(req.body.emailus, req.body.contrasenaus, await info_login).encontrado;
        console.log("encontrado" + funciones.confirmarLogin(req.body.emailus, req.body.contrasenaus, await info_login).encontrado)
        console.log("contador" + funciones.confirmarLogin(req.body.emailus, req.body.contrasenaus, await info_login).contador)
        if (comprobacion) {

            login3 = rows[funciones.confirmarLogin(req.body.emailus, req.body.contrasenaus, await info_login).contador]
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db(mydb);



                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db(mydb);
                    var query = { "idUsuario": `${login3.id}` };
                    dbo.collection(coleccion).find(query).toArray(async function (err, result) {
                        if (err) throw err;
                        pedidos = await result
                        console.log(pedidos)
                        db.close();
                         res.render('./pages/profile.pug', { "login3": login3, "enviados": pedidos });
                    });
                });










               
            })
        


} else {


    // showPrompt("Escribe algo<br>...inteligente :)")
    // var alerta="Esta mal el log"
    res.render('./pages/login.ejs')
}

        let query = 'SELECT * from Usuarios';
connection.query(query, async (err, rows1) => {
    if (err) throw err;

    login3 = rows1[funciones.confirmarLogin(req.body.emailus, req.body.contrasenaus, await info_login).contador]


});
    });
});
app.post('/registro', urlencodedParser, (req, res) => {
    let query = 'SELECT * from Usuarios';
    connection.query(query, async (err, rows) => {
        if (err) throw err;


        if (funciones.registrar(req.body.dni1, req.body.email1, await rows)) {

            // ( id, nombre, dni, administrador, telefono, email, direccion1, direccion2, direccion3, contrasena)
            const sql = `INSERT INTO Usuarios  VALUES (null,"${req.body.name1}","${req.body.dni1}",false,"${req.body.telefono1}","${req.body.email1}","${req.body.direccion1}","${req.body.direccion2}","${req.body.direccion3}",SHA("${req.body.contrasena1}"))`;
            connection.query(sql, (err, response, fields) => {
                if (err) throw err;

                res.render('./pages/login.ejs');
            });


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
    console.log(login3)
    //localStorage.setItem('envio', JSON.stringify(datosEnvioOrigen))
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
    return datosEnvioOrigen;
});
//PAGO, al darle a pagar tiene que insertarse en la BBDD de SQL.
//El numero de targeta 
app.post('/pago', urlencodedParser, (req, res) => {

    datosPago = {
        "tituTarjeta": `${req.body.tituTarjeta}`,
        "numTarjeta": `${req.body.numTarjeta}`,
        "cadTarjeta": `${req.body.cadTarjeta}`,
        "cvv": `${req.body.cvv}`
    }
    //declarado arriba para que al meterse en la BBDD se ponga la fecha de ahora.


    //iNSERCION EN MONGO










    //Insertar dentro de una coleccion de una BD
    MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        myobj = {
            "idUsuario": `${login3.id}`,
            "nombre_remitente": `${datosEnvioOrigen.nombre}`,
            "direccion_origen": `${datosEnvioOrigen.direccion}`,
            "cp_origen": `${datosEnvioOrigen.cp}`,
            "nombre_destinatario": `${datosEnvioDestino.nombre}`,
            "telefono_destinatario": `${datosEnvioDestino.telefono}`,
            "direccion_destino": `${datosEnvioDestino.direccion}`,
            "cp_destino": `${datosEnvioDestino.cp}`,
            "datos_paquete": datosPaquete,
            "importe": importe,

        };


        dbo.collection(coleccion).insertOne(myobj, async function (err, res) {
            if (err) throw err;


            dbo.collection(coleccion).findOne(myobj, await async function (err, result) {
                if (err) throw err;
                idPaquete = await result._id
                hoy = new Date();
                console.log(hoy)
                let query2 = `INSERT INTO Facturas (id,num_tarjeta,importe,fecha,id_paquete,fk_id_usuario)VALUES (null,'${req.body.numTarjeta}','${importe}','${hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate()}','${await idPaquete}',null)`;
                connection.query(query2, (err, response) => {
                    if (err) throw err;
                    console.log(response.insertId);
                    db.close();
                    connection.end();

                });

            });

        });

    });
    res.render('./pages/profile.pug', { "login3": login3, "enviados": pedidos });
})
app.get('/factura', urlencodedParser, (req, res) => {

    var result1;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        dbo.collection(coleccion).findOne({ _id: mongo.ObjectId("62b1f25a3b12d41684770aad") }, async function (err, result32) {
            if (err) throw err;
            result1 = await result32

            db.close();





            const pdf = require("html-pdf");
            const fs = require("fs");

            const ubicacionPlantilla = require.resolve("./factura.html")
            let contenidoHtml = fs.readFileSync(ubicacionPlantilla, 'utf8')

            // let paquete=localStorage.getItem('envio')

            const producto =
            {
                descripcion: "Paquete enviado",
                precio: `${result1.importe}`,
                peso: `${result1.datos_paquete.peso}`
            }

                ;
            const formateador = new Intl.NumberFormat("en", { style: "currency", "currency": "EUR" });
            let tabla = "";
            let subtotal = producto.precio;


            tabla += `<tr>
     <td>${producto.descripcion}</td>
     <td>${producto.peso} Kg</td>
     <td>${formateador.format(subtotal)}</td>
    
     </tr>`;

            const impuestos = subtotal * 0.16
            const total = subtotal + impuestos;

            hoy = new Date();
            var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
            var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
            var fechaYHora = fecha + ' ' + hora;
            contenidoHtml = contenidoHtml.replace("{{tablaProductos}}", tabla);

            // Y también los otros valores

            contenidoHtml = contenidoHtml.replace("{{subtotal}}", formateador.format(subtotal));
            contenidoHtml = contenidoHtml.replace("{{cliente}}", `${result1.nombre_remitente}`);
            contenidoHtml = contenidoHtml.replace("{{impuestos}}", formateador.format(impuestos));
            contenidoHtml = contenidoHtml.replace("{{total}}", formateador.format(total));
            contenidoHtml = contenidoHtml.replace("{{fecha}}", fechaYHora);
            contenidoHtml = contenidoHtml.replace("{{identificador}}", `${result1._id}`);
            pdf.create(contenidoHtml).toStream((error, stream) => {
                if (error) {
                    res.end("Error creando PDF: " + error)
                } else {
                    res.setHeader("Content-Type", "application/pdf");
                    stream.pipe(res)


                }

            });

        });
    });
});


//instalar esto: npm install -g html-pdf (de manera global)
//npm install html-pdf



app.post('/registroAdminBorrado', urlencodedParser, (req, res) => {

    let query3 = `DELETE FROM login WHERE email = '${req.body.emailBorrado}'`;
    connection.query(query3, (err, data) => {
        if (err) throw err;
        console.log(data);

    });
    connection.end();
    res.render('./pages/contact.ejs');
});



// REGISTRO ACTUALIZACION SERGIO

app.post("/registroAdminActualizacion", urlencodedParser, (req, res) => {

    //const sql = `INSERT INTO Usuarios  VALUES (null,"${req.body.nameAct}","${req.body.dniAct}",false,"${req.body.telefonoAct}","${req.body.emailAct}","${req.body.direccion1Act}","${req.body.direccion2Act}","${req.body.direccion3Act}",SHA("${req.body.contrasenaAct}"))`;

    let updateQuery = `UPDATE Usuarios SET  nombre = '${req.body.nameAct}', dni = '${req.body.dniAct}', administrador = true, telefono = '${req.body.telefonoAct}', email = '${req.body.emailAct}', direccion1 = '${req.body.direccion1Act}', direccion2 = '${req.body.direccion2}', direccion3 = '${req.body.direccion3}', contrasena = '${req.body.contrasena1}'   WHERE email = '${req.body.emailAct}'`;

    connection.query(updateQuery, (err, response) => {
        if (err) throw err;
        console.log(response);
        console.log(updateQuery);
        //connection.end();  
    });
});




//CANCELAR el pedido buscando el numero de tracking

app.post('/ordersBorrado', urlencodedParser, (req, res) => {
    MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        let myobj1 = req.body.cancelarPedidoTracking;

        dbo.collection(coleccion).deleteOne({ _id: mongo.ObjectId(myobj1) }, async function (err, result) {
            if (err) throw err;
            idPaquete = await result._id
            db.close();

            console.log(myobj1)
        });
        res.render('./pages/admin.ejs');
    });
});


//ACTUALIZACION DEL ORIGEN CON MONGO
app.post('/place_order_actualizado_origen', urlencodedParser, (req, res) => {
    MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        let idTrackingDestino = { _id: mongo.ObjectId(req.body.trackingOrigenActualizacion) };
        var newvalues = { $set: { "direccion_origen": `${req.body.direccionOrigen}`, "cp_origen": `${req.body.codigoPostalOrigen}` } };
        dbo.collection(coleccion).updateOne(idTrackingDestino, newvalues, function (err, res) {

            if (err) throw err;
            db.close();

            console.log(idTrackingDestino);
        });

        res.render('./pages/contact.ejs');
    });
});


//ACTUALIZACION DEL DESTINO CON MONGO
app.post('/place_order_actualizado_destino', urlencodedParser, (req, res) => {
    MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        let idTrackingDestino = { _id: mongo.ObjectId(req.body.trackingDestinoActualizacion) };
        var newvalues = { $set: { "nombre_destinatario": `${req.body.nombreDestinatario}`, "telefono_destinatario": `${req.body.telefonoDestinatario}`, "direccion_destino": `${req.body.direccionDestino}`, "cp_destino": `${req.body.codigoPostalDestino}` } };
        dbo.collection(coleccion).updateOne(idTrackingDestino, newvalues, function (err, res) {

            if (err) throw err;
            db.close();

            console.log(idTrackingDestino);
        });

        res.render('./pages/contact.ejs');
    });
});


// ACTULIZACIÓN DE MEDIDAS PAQUETE.

app.post('/place_order_actualizado_paquete', urlencodedParser, (req, res) => {
    MongoClient.connect(url, async function (err, db) {
        if (err) throw err;
        var dbo = db.db(mydb);
        let idTrackingPaquete = { _id: mongo.ObjectId(req.body.idTrackingPaquete) };
        var newvalues = { $set: { "datos_paquete.peso": `${req.body.pesoAct}`, "datos_paquete.alto": `${req.body.altoAct}`, "datos_paquete.largo": `${req.body.largoAct}`, "datos_paquete.ancho": `${req.body.anchoAct}` } };
        dbo.collection(coleccion).updateOne(idTrackingPaquete, newvalues, function (err, res) {

            if (err) throw err;
            db.close();

            console.log(idTrackingPaquete);
        });

        res.render('./pages/contact.ejs');
    });
});



app.listen(3000);







