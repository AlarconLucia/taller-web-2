import { Request, Response } from "express";
import { PedidoService } from "../services/pedido.service";

interface RequestConUsuario extends Request {
  usuario?: { id: number };
}

export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  public crearPedido = async (req: RequestConUsuario, res: Response) => {
    const usuarioId = req.usuario?.id;
    const { items } = req.body;

    if (!usuarioId) {
      res.status(401).json({ message: "No autorizado" });
        return;
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ message: "No se proporcionaron items en el carrito" });
        return;
    }

    try {
      await this.pedidoService.crearPedido(usuarioId, items);
      res.status(201).json({ message: "Pedido creado exitosamente" });
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };
}