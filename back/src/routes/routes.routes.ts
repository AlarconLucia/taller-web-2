import { Router } from "express";
import { usuarioRouter } from "./usuario/usuario.routes";
import { productoRouter } from "./producto/producto.routes";
import { tipoProductoRouter } from "./producto/tipo-producto.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/api/usuario", usuarioRouter);
    router.use("/api/productos", productoRouter);
    router.use("/api/tipos-producto", tipoProductoRouter);
    return router;
  }
}
