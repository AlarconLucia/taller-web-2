import { Request, Response, Router } from "express";
import { ProductoService } from "../services/producto.service";
import { ProductoRepository } from "../repository/producto.repository";
import { RequestConUsuario } from "../middlewares/auth.middleware";


const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);
const SECRET = "Alarcon-Vara";

const router = Router();

export class ProductoController {
  constructor() { }

  public obtenerProductos = async (req: Request, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const tipoProductoId = req.query.tipoProductoId as string | undefined;
    const sortBy = req.query.sortBy as string | undefined;
    const sortOrder = req.query.sortOrder as 'asc' | 'desc' | undefined;
    const query = req.query.q as string | undefined;

    const idAsNumber = tipoProductoId ? parseInt(tipoProductoId, 10) : undefined;

    try {
    const products = await productoService.findAll(idAsNumber, sortBy, sortOrder, query, page);
      res.status(200).json(products);
    } catch (error) {
       console.error("Error al obtener productos:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  public obtenerProductoPorId = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ mensaje: "ID inválido" });
    }

    try {
      const producto = await productoService.obtenerProductoPorId(id);
      
      if (!producto) {
        res.status(404).json({ mensaje: "Producto no encontrado" });
      }

       res.status(200).json(producto);
    } catch (error) {
      console.error("Error al obtener producto:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  };

  public registrarProducto = async (req: RequestConUsuario, res: Response) => {
    if (req.usuario?.tipo !== 'admin') {
      res.status(403).json({ message: 'Acceso denegado: Se requiere rol de administrador.' });
      return;
    }

  try {
    const { nombre, descripcion, precio, tipo } = req.body;
    console.log('Datos recibidos:', req.body);
    console.log('Archivo recibido:', req.file);

    const nuevoProducto = await productoService.crearProducto({
      nombre,
      descripcion,
      precio: parseFloat(precio),
      tipo: parseInt(tipo),
    });

    if (req.file) {
      const fs = require('fs');
      const path = require('path');

      const ext = path.extname(req.file.originalname);
      const nuevoNombre = `${nuevoProducto.id}${ext}`;
      const destino = path.join(__dirname, `../../public/img/productos/${nuevoNombre}`);
console.log('Moviendo imagen a:', destino);
      fs.renameSync(req.file.path, destino);
    }

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al registrar producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
}
