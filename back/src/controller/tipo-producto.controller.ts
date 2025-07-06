import { Request, Response } from "express";
import { TipoProductoService } from "../services/tipo-producto.service";
import { TipoProductoRepository } from "../repository/tipo-producto.repository";

const tipoProductoRepository = new TipoProductoRepository();
const tipoProductoService = new TipoProductoService(tipoProductoRepository);

export class TipoProductoController {
  constructor() {}

  public getAll = async (req: Request, res: Response) => {
    try {
      const tipos = await tipoProductoService.findAll();
      res.status(200).json(tipos);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los tipos de producto" });
    }
  };
}
