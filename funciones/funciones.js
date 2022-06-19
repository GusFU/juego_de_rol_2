/**
   *@Gustavo
   *@Sergio
   *@JoseLuis
   *@YannPoirot 
  */

//En este archivo js  van a estar las funciones que usaremos en el resto de la aplicacion exportandolas con module.exports = funciones1;

const funciones1 = {
    registrar: registrar, //separarlos por comas
    confirmarLogin: confirmarLogin,
    todoUsuario: todoUsuario,
    precio: precio,
    generarPdf: generarPdf
}

function registrar(dni, email, emails) {
let corresponde= false
    let letra = dni[8].toUpperCase();
    let serie = 'TRWAGMYFPDXBNJZSQVHLCKET';
    if (serie[Number(dni.substring(0, 8)) % 23] == letra) {
        corresponde = true;
        var cont = 0

        if (corresponde) {

            while (corresponde) {
                if (email == emails[cont]) {

                    return (email == emails[cont])
                } else {
                    cont++
                }
                corresponde = corresponde && (email == emails[cont])
            }

        } else {
            return false;
        }
    }
}





//si el ususario coincide con el usuario y la contraseña con los de la BBDD, pues que entre.

function confirmarLogin(emailLogin, contrasenaLogin, rows) {

    // for (let i = 0; i < emailssql; i++) {

    let cont = 0;
    let test = true;

    while (test) {//mientras test sea verdadero se hará todo lo que hay dentro.

        if ((emailLogin == rows[cont].email && contrasenaLogin == rows[cont].contrasena)) {

            return (emailLogin == rows[cont].email && contrasenaLogin == rows[cont].contrasena)
        } else {
            cont++
        }
        test = test && (emailLogin == rows[cont].email && contrasenaLogin == rows[cont].contrasena)
    }



}

function todoUsuario(email, rows) {
    let cont = 0;
    let test = true;
    while (test) {

        if (email == rows[cont].email) {

            return cont
        } else {
            cont++
        }
        test = test && (email == rows[cont].email)
    }

}
//calculo de precio de paquete
function precio(peso, alto, largo, ancho) {
    const precio1 = 2;
    var volumen = alto * largo * ancho;
    var precioTotal = precio1 * volumen * peso
    return precioTotal
}

function generarPdf(){
    var doc = new jsPDF()
    
    doc.text('Hello world!', 10, 10)
    doc.save('a4.pdf')
    }



module.exports = funciones1;

