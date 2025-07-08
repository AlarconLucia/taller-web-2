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
  
  INSERT INTO Tipo_producto (tipo) VALUES 
  ('Zapatos'),
  ('Cuerpo entero');

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
  
  INSERT INTO Producto (nombre, descripcion, precio, tipo) VALUES
	('HoloFrame X3', 'Lentes de ingeniería óptica avanzada', 6500.00, 3),
    ('Vestido HoloSkin', 'Vestido adaptable a la temperatura del cuerpo', 12000.00, 7),
    ('Campera Vórtice', 'Campera con geometría de precisión quirúrgica', 11500.00, 5),
    ('Neon Stride', 'Botas con diseño angular y luz azul integrada', 8200.00, 6),
    ('MonoPulse', 'Botas estilo retro-futurista de alto contraste', 10500.00, 6),
    ('SynFiber Suit', 'Traje ergodinámico con líneas biomecánicas', 15000.00, 7),
    ('Cyber Heel Pro', 'Tacones con resorte y módulos mecánicos', 9100.00, 6),
    ('CoreTitan Shell', 'Armadura pectoral con núcleo de poder', 21000.00, 7);
  
  
  INSERT INTO Usuario (nombre, apellido, email, passw, direccion, tipo) VALUES 
	('Admin', 'NovaShop', 'admin@novashop.com', 'Admin1' 'Nueva York, calle 72', 'admin');
