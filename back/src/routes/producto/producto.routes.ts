import { Router } from "express";
import { ProductoController } from "../../controller/producto.controller";
import { upload } from "../../upload";
import { verificarTokenMiddleware } from "../../middlewares/auth.middleware"; // Asegúrate de importar el middleware

export const productoRouter = Router();
const productoController = new ProductoController();

productoRouter.get("/", productoController.obtenerProductos);
productoRouter.get("/ver-producto/:id", productoController.obtenerProductoPorId);

productoRouter.post(
  "/registro", 
  verificarTokenMiddleware,
  upload.single('imagen'),
  productoController.registrarProducto
);
