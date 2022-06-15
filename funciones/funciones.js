
const funciones1 = {
    registrar: registrar,
    confirmarLogin: confirmarLogin
}

function registrar(nombre, dni, telefono, email, direccion1, direccion2, direccion3, contrasena) {

    if (nombre.mach(/^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)$/) //Introduce tu Nombre y Apellidos ej. Sergio Conde Alcalde
        && (dni.match(/^\d{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/)) //Introduce tu DNI ej. 12345678A 
        && (email.match(/^[a-zA-Z0-9_\-\.~]{2,}@[a-zA-Z0-9_\-\.~]{2,}\.[a-zA-Z]{2,4}$/))
        && (contrasena.mach(/(?=^.{6,}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/))
        && (telefono.match(/[0-9]{9}/)))
    // "Aa1-sergio"> 
    {
        return 1;
    } else {
        return 0;
    }
}





//si el ususario coincide con el usuario y la contraseña con los de la BBDD, pues que entre.

function confirmarLogin(emailLogin, contrasenaLogin, rows) {

    // for (let i = 0; i < emailssql; i++) {
    
    let cont = 0;
    let test = true;
   
    while (test) {
        if ((emailLogin == rows[cont].email && contrasenaLogin == rows[cont].contrasena)) {

            return (emailLogin == rows[cont].email && contrasenaLogin == rows[cont].contrasena)
        } else {
            cont++
        }
        test = test && (emailLogin == rows[cont].email && contrasenaLogin == rows[cont].contrasena)
    }

    //   return emailssql.indexOf(emailLogin) == contrasenassql.indexOf(contrasenaLogin)

    // }




}


// Una forma para crear un JSON.



module.exports = funciones1;

