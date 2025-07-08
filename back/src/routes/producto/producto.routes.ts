import { Router } from "express";
import { ProductoController } from "../../controller/producto.controller";

export const productoRouter = Router();
const productoController = new ProductoController();

productoRouter.get(
  "/",
  productoController.obtenerProductos.bind(productoController)
);
productoRouter.get("/ver-producto/:id", productoController.obtenerProductoPorId.bind(productoController));
