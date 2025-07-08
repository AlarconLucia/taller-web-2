import { Router } from "express";
import { PedidoController } from "../../controller/pedido.controller";
import { PedidoService } from "../../services/pedido.service";
import { PedidoRepository } from "../../repository/pedido.repository";
import { verificarTokenMiddleware } from "../../middlewares/auth.middleware"; 

export const pedidoRouter = Router();

const repository = new PedidoRepository(); 
const service = new PedidoService(repository);
const pedidoController = new PedidoController(service);

pedidoRouter.post('/', verificarTokenMiddleware, pedidoController.crearPedido);