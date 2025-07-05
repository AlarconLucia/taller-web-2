import { Router } from "express";
import { ProductoController } from "../../controller/producto.controller"; // Asegúrate que la ruta sea correcta

export const productoRouter = Router();
const productoController = new ProductoController();

productoRouter.get(
  "/",
  productoController.getAllProducts.bind(productoController)
);
