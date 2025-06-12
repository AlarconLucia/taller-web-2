CREATE DATABASE Nova_shop;
USE Nova_shop;

CREATE TABLE Usuario(
	id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR(30),
    apellido VARCHAR(30),
    email VARCHAR(30),
    passw VARCHAR(30),
    direccion VARCHAR(30)
);