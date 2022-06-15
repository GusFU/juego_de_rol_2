#DROP DATABASE Personas;

CREATE DATABASE Personas;

USE Personas;

#DROP TABLE Usuarios
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    dni CHAR(9) UNIQUE NOT NULL,
    administrador BOOLEAN NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    direccion1 VARCHAR(500) NOT NULL,
    direccion2 VARCHAR(500),
    direccion3 VARCHAR(500),
    contrasena VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);
INSERT INTO Usuarios VALUES(NULL,"sergio aaa ddd","12345678a",false,123456789,"kkkkkk@kkkk.com","recoletos 15",null,null,"1234");
INSERT INTO Usuarios VALUES(NULL,"gustavo aaa ddd","87654321a",false,123456789,"gggggggg@kkkk.com","recoletos 112",null,null,"1234");
select * from Usuarios;

#DROP TABLE Logins;
CREATE TABLE Login (
    id INT AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    fk_id_usuario INT,
    PRIMARY KEY(id),
    FOREIGN KEY(fk_id_usuario) REFERENCES Usuarios(id)
);
insert into Login values(null,"kkkkkk@kkkk.com","1234",1);
insert into Login values(null,"gggggggg@kkkk.com","1234",3);
select * from Login;
#DROP TABLE Tarjetas
CREATE TABLE Tarjetas (
    id INT AUTO_INCREMENT,
    nombre_tarjeta VARCHAR(300) NOT NULL,
    fecha_caducidad DATE NOT NULL,
    cvv CHAR(3) NOT NULL,
    num_tarjeta CHAR(16) NOT NULL,
    PRIMARY KEY(id)
);

#DROP TABLE tarjetas_usuarios;
CREATE TABLE tarjetas_usuarios(
    id INT AUTO_INCREMENT,
    fk_id_tarjeta INT,
    fk_id_usuario INT,
    PRIMARY KEY(id),
    FOREIGN KEY(fk_id_usuario) REFERENCES Usuarios(id),
    FOREIGN KEY(fk_id_tarjeta) REFERENCES Tarjetas(id)
);