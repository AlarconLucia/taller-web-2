import { Request, Response, Router } from "express";
import { ProductoService } from "../services/producto.service";
import { ProductoRepository } from "../repository/producto.repository";

const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);
const SECRET = "Alarcon-Vara";

const router = Router();

export class ProductoController {
  constructor() { }

  public obtenerProductos = async (req: Request, res: Response) => {
    const tipoProductoId = req.query.tipoProductoId as string | undefined;
    const sortBy = req.query.sortBy as string | undefined;
    const sortOrder = req.query.sortOrder as 'asc' | 'desc' | undefined;
    const query = req.query.q as string | undefined;

    const idAsNumber = tipoProductoId ? parseInt(tipoProductoId, 10) : undefined;

    try {
      const products = await productoService.findAll(idAsNumber, sortBy, sortOrder, query);
      res.status(200).json(products);
    } catch (error) {

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
}
