import { Router } from "express";
import { TipoProductoController } from "../../controller/tipo-producto.controller";

export const tipoProductoRouter = Router();
const controller = new TipoProductoController();

tipoProductoRouter.get("/", controller.getAll.bind(controller));
