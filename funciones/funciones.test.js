const funciones = require('./funciones');//lama al archivo funciones.

describe('comparaciones de email', () => {//le da los parametros en el array para que busque lo que se desea buscar, el mismo email en este caso.
    test('Registrar',() => {
       expect( funciones.registrar("50892007e","lal@lala.com",["aa@aa.com","ee@ee.com","lal@lala.com"])).toBeTruthy();
    });//Eesto simula el login con la base de datos que tiene muchos correos almacenados. 
    test('Login', () => {
        expect(funciones.todoUsuario("aa@aa.com",[{"email": "aa@aa.com"}])).toBe(0);
    });
});
//este SEGUNDO todo usuusario: busca en el array d elos emails para devolver la posi en la que está el usuario, que en la funcion de todoUsuario es Row el ID.