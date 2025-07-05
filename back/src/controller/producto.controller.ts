import { Request, Response, Router } from "express";
import { ProductoService } from "../services/producto.service";
import { ProductoRepository } from "../repository/producto.repository";

const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);
const SECRET = "Alarcon-Vara";

const router = Router();

export class ProductoController {
  constructor() {}

  public getAllProducts = async (_req: Request, res: Response) => {
    try {
      const products = await productoService.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los productos" });
    }
  };
  public getRouter() {
    return router;
  }
}
