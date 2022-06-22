#DROP DATABASE Personas;

CREATE DATABASE Personas;

USE Personas;

#DROP TABLE Usuarios
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    dni CHAR(9) NOT NULL,
    administrador BOOLEAN NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    email VARCHAR(100) unique NOT NULL,
    direccion1 VARCHAR(500) NOT NULL,
    direccion2 VARCHAR(500) default null,
    direccion3 VARCHAR(500)default null,
    contrasena VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

#DROP TABLE Logins;
CREATE TABLE Login (
    id INT AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    fk_id_usuario INT,
    PRIMARY KEY(id),
    FOREIGN KEY(fk_id_usuario) REFERENCES Usuarios(id)
);




INSERT INTO Usuarios VALUES(NULL,"Sergio Conde Alcalde","50892007e",true,663538912,"02sergioconde@gmailcom","recoletos 15",null,null,sha("Aa1-sergio"));


#DROP TABLE Facturas
CREATE TABLE Facturas (
    id INT AUTO_INCREMENT,
    num_tarjeta CHAR(16) NOT NULL,
    importe int,
    fecha date,
    id_paquete int,
    fk_id_usuario int,
    PRIMARY KEY(id),
    foreign key(fk_id_usuario) REFERENCES Usuarios(id)
);

DELIMITER //
CREATE TRIGGER borraUsuario
AFTER DELETE ON login 
FOR EACH ROW 
BEGIN
	DELETE FROM Usuarios WHERE email = OLD.email ;
    END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER ActualizarUsuario
AFTER UPDATE ON Usuarios
FOR EACH ROW 
BEGIN
	UPDATE Login SET email = new.email, contrasena = new.contrasena WHERE new.id = fk_id_usuario ;
    END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER ejemploAntesActualizar
after insert ON Usuarios
FOR EACH ROW 
BEGIN
	
	INSERT INTO Login VALUES (NULL, new.email, new.contrasena,new.id);
    
END //
DELIMITER ;

select * from Login;
select * from Usuarios;





