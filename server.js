
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
// dónde cargar los archivos estáticos PARA HACER css, mapa...
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('view engine', 'pug');
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

            const sql = await `INSERT INTO Usuarios ( nombre, dni, telefono, email, direccion1,  contrasena) VALUES ('${nombre}', '${dni}','${telefono}','${email}','${direccion1}','${contrasena}')`;
            await connection.query(sql, (err, response, fields) => {
                if (err) throw err;
                connection.end();
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


    res.render('./pages/profile.pug')

});
//instalar esto: npm install -g html-pdf (de manera global)
//npm install html-pdf

 const pdf = require("html-pdf");
 const fs = require("fs");
//   const ejsToPdf= {String} ('./views/pages/factura.ejs')
// //   @param {Object} data Data to be passed
// //   @private
const ubicacionPlantilla = require.resolve("./factura.html")
 let contenidoHtml = fs.readFileSync(ubicacionPlantilla, 'utf8')
 // Estos productos podrían venir de cualquier lugar
 const productos = [
     {
         descripcion: "Nintendo Switch",
         cantidad: 2,
         precio: 300,
     },
     {
         descripcion: "Videojuego: Hollow Knight",
         cantidad: 1,
         precio: 15,
     },
     {
         descripcion: "Audífonos HyperX",
         cantidad: 5,
         precio: 15,
     },
 ];
 
 // Nota: el formateador solo es para, valga la redundancia, formatear el dinero. No es requerido, solo que quiero que se vea bonito
 // https://parzibyte.me/blog/2021/05/03/formatear-dinero-javascript/
 const formateador = new Intl.NumberFormat("en", { style: "currency", "currency": "EUR" });
 // Generar el HTML de la tabla
 app.get('/factura', (req,res) => {
 let tabla = "";
 let subtotal = 0;
 for (let producto of productos) {
     // Aumentar el total
     const totalProducto = producto.cantidad * producto.precio;
     subtotal += totalProducto;
     // Y concatenar los productos
     tabla += `<tr>
     <td>${producto.descripcion}</td>
     <td>${producto.cantidad}</td>
     <td>${formateador.format(producto.precio)}</td>
     <td>${formateador.format(totalProducto)}</td>
     </tr>`;
 }
 const impuestos = subtotal * 0.16
 const total = subtotal + impuestos;

 var hoy = new Date();

var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();

	
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

var fechaYHora = fecha + ' ' + hora;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$ºª%&/()*Ç=?[]{}+-_^<>ç';
let result = '';
const charactersLength = characters.length;
for (let i = 0; i < 9; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
 // Remplazar el valor {{tablaProductos}} por el verdadero valor
 contenidoHtml = contenidoHtml.replace("{{tablaProductos}}", tabla);
 
 // Y también los otros valores
 
 contenidoHtml = contenidoHtml.replace("{{subtotal}}", formateador.format(subtotal));

 contenidoHtml = contenidoHtml.replace("{{impuestos}}", formateador.format(impuestos));
 contenidoHtml = contenidoHtml.replace("{{total}}", formateador.format(total));
 contenidoHtml = contenidoHtml.replace("{{fecha}}", fechaYHora);
 contenidoHtml = contenidoHtml.replace("{{identificador}}", result);
 pdf.create(contenidoHtml).toStream((error, stream) => {
    if (error) {
        res.end("Error creando PDF: " + error)
    } else {
        res.setHeader("Content-Type", "application/pdf");
        stream.pipe(res);
    }
});

// res.render("./pages/factura.ejs")
})

//  pdf.create(contenidoHtml).toFile("salida.pdf", (error) => {
//      if (error) {
//          console.log("Error creando PDF: " + error)
//      } else {
//          console.log("PDF creado correctamente");
//      }
//  });




app.listen(3000);