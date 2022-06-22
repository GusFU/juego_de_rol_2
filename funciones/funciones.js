
/**

 * @fileoverview            PlanetExpress Juego de Rol 2

 * 

 *Es una empresa de paquetería madrileña basada en las nuevas tecnologías.

 *En esta presente documentación vamos a comentar las principales funciones que hacen posible el correcto funcionamiento interno.
 Dependencias: "dependencies": {
    "body-parser": "^1.20.0",
    "ejs": "^3.1.8",
    "express": "^4.18.1",
    "fs": "^0.0.1-security",
    "html": "^1.0.0",
    "html-pdf": "^3.0.1",
    "jdoc": "^0.2.0",
    "jest": "^28.1.1",
    "jsdoc": "^3.6.10",
    "mongodb": "^4.7.0",
    "mysql": "^2.18.1",
    "nodemon": "^2.0.16",
    "pug": "^3.0.2"
  }

 * @version                               2.2

 *

 * @author                 Gustavo Carretero <guscp84@gmail.com>
 * @author                 Yann Victor Poirot Sanz  <yannpoirotsanz@gmail.com>
 * @author                 Jose Luis Sanjurjo <jurjomed@hotmail.com>
 * @author                 Sergio Conde Alcalde <02sergioconde@gmail.com>

 * @copyright              PlanetExpress.com

 *

 * History

 * v1.0.0 – Creación de PlanetExpress



*/

 




//se alamacenan aqui las funciones para llamarlas en otro archivo, en este caso desde SERVER.JS

const funciones1 = {
    registrar: registrar, //separarlos por comas
    confirmarLogin: confirmarLogin,
    todoUsuario: todoUsuario,
    precio: precio
}

/**
 *Funcion registrar: esta función tiene tres parametros fundamentales que tomamos para validar pero tambien hemos metido una comprobación de DNI real para que un usuario con un unico DNI pueda tener varias cuentas, como es el caso del CIF y las empresas.  
 @param {string}
 @param {string}
 @param {string}
 @return {true}
 @return {false}
 */

function registrar(dni, email, emails) {
    let corresponde = false
    let encontrado = true
    let test = true;
    let letra = dni[8].toUpperCase();
    let serie = 'TRWAGMYFPDXBNJZSQVHLCKET';
    if (serie[Number(dni.substring(0, 8)) % 23] == letra) {
        corresponde = true;
        var cont = 0

        if (corresponde) {
            
            while (test) {
                console.log(emails.length)
                test = test && (email != emails[cont].email) && (cont < emails.length-1)
                if (email == emails[cont].email) {
                    encontrado = false
                }

                cont++

            }

            return encontrado
        } else {
            return !encontrado;
        }


    } else {

    }
}





//si el ususario coincide con el usuario y la contraseña con los de la BBDD, pues que entre.

/**
 *Funcion confirmarLogin: esta función tiene tres parametros fundamentales que tomamos paraconfirmar el login y son:  emailLogin, contrasenaLogin y rows.  
 *Si el ususario y contraseña coinciden con el usuario y contraseña introducidos en el input, el ususario tiene acceso al espacio personal y demás.
 *Hay que mencionar que la contraseña está encriptada con SHA1 de SQL.
 @param {string}
 @param {string}
 @param {string}
 @return {true}
 */
function confirmarLogin(emailLogin, contrasenaLogin, rows) {
    let cont = 0;
    let test = true;
    let encontrado = false;
    let cont1;
    let contrasena = SHA1(contrasenaLogin)

    while (test) {//mientras test sea verdadero se hará todo lo que hay dentro.
        test = test && (cont < rows.length-1) && ((emailLogin != rows[cont].email) || (contrasena != rows[cont].contrasena))
        if ((emailLogin == rows[cont].email) && (contrasena == rows[cont].contrasena)) {
            encontrado = true
            cont1 = cont
        }
        cont++

    }

    return { "encontrado": encontrado, "contador": cont1 }
}


/**
 *Funcion todoUsuario: esta función tiene dos parametros fundamentales email y rows.  
 @param {string}
 @param {string}
 */

function todoUsuario(email, rows) {
    let cont1 = 0;
    let test = true;
    while (test) {

        if (email == rows[cont1].email) {

            return cont1
        } else {

            cont1++
        }
        test = test && (email != rows[cont1].email) && cont1 < rows.length
    }

}

/**
 *Funcion precio: esta función tiene 4 parametros fundamentales peso,alto,largo y ancho.  Sirve para calcular el coste de cada paquete que se realiza.
 @param {int}
 @param {int}
 @param {int}
 @param {int}
 @return {int}
 */
function precio(peso, alto, largo, ancho) {
    const precio1 = 2;
    var volumen = alto * largo * ancho;
    var precioTotal = precio1 * volumen * peso
    return precioTotal
}

function SHA1(msg) {
    function rotate_left(n, s) {
        var t4 = (n << s) | (n >>> (32 - s));
        return t4;
    };
    function lsb_hex(val) {
        var str = '';
        var i;
        var vh;
        var vl;
        for (i = 0; i <= 6; i += 2) {
            vh = (val >>> (i * 4 + 4)) & 0x0f;
            vl = (val >>> (i * 4)) & 0x0f;
            str += vh.toString(16) + vl.toString(16);
        }
        return str;
    };
    function cvt_hex(val) {
        var str = '';
        var i;
        var v;
        for (i = 7; i >= 0; i--) {
            v = (val >>> (i * 4)) & 0x0f;
            str += v.toString(16);
        }
        return str;
    };
    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
    msg = Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = new Array();
    for (i = 0; i < msg_len - 3; i += 4) {
        j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
            msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
        word_array.push(j);
    }
    switch (msg_len % 4) {
        case 0:
            i = 0x080000000;
            break;
        case 1:
            i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
            break;
        case 2:
            i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
            break;
        case 3:
            i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
            break;
    }
    word_array.push(i);
    while ((word_array.length % 16) != 14) word_array.push(0);
    word_array.push(msg_len >>> 29);
    word_array.push((msg_len << 3) & 0x0ffffffff);
    for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
        for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
        for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        A = H0;
        B = H1;
        C = H2;
        D = H3;
        E = H4;
        for (i = 0; i <= 19; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 20; i <= 39; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 40; i <= 59; i++) {
            temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        for (i = 60; i <= 79; i++) {
            temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
            E = D;
            D = C;
            C = rotate_left(B, 30);
            B = A;
            A = temp;
        }
        H0 = (H0 + A) & 0x0ffffffff;
        H1 = (H1 + B) & 0x0ffffffff;
        H2 = (H2 + C) & 0x0ffffffff;
        H3 = (H3 + D) & 0x0ffffffff;
        H4 = (H4 + E) & 0x0ffffffff;
    }
    var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

    return temp.toLowerCase();
}








module.exports = funciones1;
