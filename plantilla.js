
var hoy = new Date();

var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();

	
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

var fechaYHora = fecha + ' ' + hora;
//Obteniendo una variable con la máscara d-m-Y H:i:s
console.log(fechaYHora)
document.getElementById('fecha').innerText=fechaYHora

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$ºª%&/()*Ç=?[]{}+-_^<>ç';
let result = '';
const charactersLength = characters.length;
for (let i = 0; i < 9; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
document.getElementById('identificador').innerText=result






