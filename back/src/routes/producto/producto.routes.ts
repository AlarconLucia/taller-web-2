import { Router } from "express";
import { ProductoController } from "../../controller/producto.controller";
import { upload } from "../../upload";

export const productoRouter = Router();
const productoController = new ProductoController();

productoRouter.get(
  "/",
  productoController.obtenerProductos.bind(productoController)
);
productoRouter.get("/ver-producto/:id", productoController.obtenerProductoPorId.bind(productoController));
productoRouter.post("/registro", upload.single('imagen'), productoController.registrarProducto.bind(productoController));