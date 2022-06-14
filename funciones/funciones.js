function registrar(nombre,dni,telefono,email,direccion1,direccion2,direccion3,contrasena){



if (nombre.mach (/^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)$/) //Introduce tu Nombre y Apellidos ej. Sergio Conde Alcalde
&& (dni.match (/^\d{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/)) //Introduce tu DNI ej. 12345678A 
&& (email.match (/^[a-zA-Z0-9_\-\.~]{2,}@[a-zA-Z0-9_\-\.~]{2,}\.[a-zA-Z]{2,4}$/))
&& (contrasena.mach (/(?=^.{6,}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/))
&& (telefono.match  (/[0-9]{9}/)))
// "Aa1-sergio"> 
{  
 return 1;
} else {
 return 0;
}
}
