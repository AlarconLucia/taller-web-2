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
  
   INSERT INTO Producto (nombre, descripcion, precio, tipo) VALUES
   ('Nova Valkyrie', 'Armadura táctica de exploración espacial ligera', 22000.00, 7),
   ('LumaLoop Heels', 'Tacones futuristas con iluminación orbital', 10999.99, 6),
   ('Crimson Echo', 'Traje vinílico extremo para performance visual', 19999.99, 7),
   ('SilverShield Mask', 'Mascarilla plateada de estilo futurista', 8000.00, 3),
	('Tubular Core Armor', 'Armadura plateada con tubos expuestos', 21999.99, 7),
	('FadeSpring Boots', 'Botas con resortes y diseño semitransparente', 6000.00, 6),
	('StealthBlack Jacket', 'Campera negra táctica ajustada al cuerpo', 12000.00, 5),
	('FrostGuard Jacket', 'Campera blanca abrigada de combate', 11000.00, 5),
	('NeonRun Boots', 'Zapatillas futuristas estilo bota deportiva', 9999.99, 6),
	('Aether Queen Armor', 'Armadura femenina completa con capa', 23000.00, 7),
	('RollerKicks', 'Botas con ruedas integradas en la base', 9999.99, 6),
	('ChromeLeg Wraps', 'Pantalones plateados envolventes', 11500.00, 4),
	('SpikedVision Mask', 'Máscara plateada con visor naranja y picos', 8500.00, 3),
	('WrapShades', 'Lentes oscuros con marco que envuelve orejas', 6500.00, 3),
	('OrangeCore Mask', 'Máscara con visor naranja integrada', 7000.00, 3),
	('NeoVision Glasses', 'Anteojos de diseño futurista', 4500.00, 3),
	('VoltRush Sneakers', 'Zapatillas con cañón lateral', 15000.00, 6),
	('MechaHeels', 'Botas con taco alto y mecanismos visibles', 12500.00, 6),
	('AirFit Sneakers', 'Zapatillas con cámara de aire y ajuste automático', 10500.00, 6),
	('ClawGlove', 'Guante con garras metálicas', 6000.00, 3),
	('Titanium ExoSuit', 'Armadura completa con casco incluido', 22000.00, 3),
	('SplitCore Armor', 'Armadura femenina dividida en dos piezas', 18000.00, 7),
	('JumpForce Boots', 'Botas para saltos extremos y rebote', 14500.00, 6),
	('SilverCloak Dress', 'Vestido con capa y hombreras plateadas', 16000.00, 7),
	('WebCorset', 'Corset con nanotextiles similares a la telaraña', 12000.00, 1),
	('FloatPod Tee', 'Top con mangas globo para flotar', 4500.00, 1),
	('FemCore Plate', 'Parte superior de armadura femenina', 5500.00, 1),
	('FaceWrap Band', 'Vincha desplegable que tapa el rostro', 8500.00, 3),
	('EchoMask', 'Máscara de diseño extravagante', 3200.00, 3),
	('NeuroShell Helmet', 'Casco total con visor delgado adaptable', 13200.00, 3),
	('Winged Veil Dress', 'Vestido que cubre cabeza y espalda con pico', 21500.00, 7),
	('FullDome Helmet', 'Casco completo sin visor ni aberturas', 7600.00, 3),
	('AeroFusion Suit', 'Traje celeste con campera rosa incluida', 25000.00, 7);
  
  INSERT INTO Usuario (nombre, apellido, email, passw, direccion, tipo) VALUES 
	('Admin', 'NovaShop', 'admin@novashop.com', 'Admin1', 'Nueva York, calle 72', 'admin')