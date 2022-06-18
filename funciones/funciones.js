
const funciones1 = {
    registrar: registrar,
    confirmarLogin: confirmarLogin
}

function registrar(dni,email,emails) {
   


        
        let letra = dni[8].toUpperCase();
            let serie = 'TRWAGMYFPDXBNJZSQVHLCKET';
            if (serie[Number(dni.substring(0, 8)) % 23] == letra) {
              let corresponde=true;
            }

if (corresponde){
   
    while (corresponde) {
        if (email == emails[cont] ) {

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

