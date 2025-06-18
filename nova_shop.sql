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

ALTER TABLE Usuario ADD COLUMN tipo VARCHAR(20) DEFAULT 'cliente';
ALTER TABLE Usuario ADD CONSTRAINT email_unico UNIQUE (email);

CREATE TABLE Tipo_producto (
	id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    tipo VARCHAR(30)
);

CREATE TABLE Producto(
	id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    nombre VARCHAR(20),
    descripcion VARCHAR(50),
    precio DECIMAL(10,2),
    tipo INTEGER REFERENCES Tipo_producto(id)
);

CREATE TABLE Pedido(
	id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
	usuario INTEGER REFERENCES Usuario(id),
    producto INTEGER REFERENCES Producto(id)
);

INSERT INTO Tipo_producto (tipo) VALUES 
  ('Remera'),
  ('Buzo'),
  ('Accesorio'),
  ('Pantalón'),
  ('Campera');

INSERT INTO Producto (nombre, descripcion, precio, tipo) VALUES
  ('NeoSkin Tee', 'Remera térmica con nanotela', 4999.99, 1),
  ('Plasma Hoodie', 'Buzo con paneles térmicos activos', 8999.50, 2),
  ('Quantum Watch', 'Reloj con proyección holográfica', 15000.00, 3),
  ('Lunar Pants', 'Pantalón antigravitatorio', 6999.99, 4),
  ('Cyber Jacket', 'Campera con carga solar', 12000.00, 5),
  ('BioMesh Tee', 'Remera con sensores biométricos', 5499.00, 1),
  ('ThermoBuzo', 'Buzo de aislamiento climático', 8700.00, 2),
  ('NanoBracelet', 'Pulsera con ID molecular', 4500.00, 3),
  ('HoloPants', 'Pantalón con camuflaje óptico', 10200.00, 4),
  ('Storm Coat', 'Campera resistente a tormentas eléctricas', 13500.00, 5);
