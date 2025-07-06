import { Request, Response, Router } from "express";
import { ProductoService } from "../services/producto.service";
import { ProductoRepository } from "../repository/producto.repository";

const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);
const SECRET = "Alarcon-Vara";

const router = Router();

export class ProductoController {
  constructor() {}

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
}
