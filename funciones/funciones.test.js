const funciones = require('./funciones');

describe('comparaciones de email', () => {
    test('comparamos registro',() => {
       expect( funciones.registrar("50892007e","lal@lala.com",["aa@aa.com","ee@ee.com","lal@lala.com"])).toBeTruthy();
    });
   
});