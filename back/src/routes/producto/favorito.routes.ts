import { Router } from "express";
import { FavoritoController } from "../../controller/favorito.controller";
import { FavoritoService } from "../../services/favorito.service";
import { FavoritoRepository } from "../../repository/favorito.repository";
import { verificarTokenMiddleware } from "../../middlewares/auth.middleware";

export const favoritoRouter = Router();

const repository = new FavoritoRepository();
const service = new FavoritoService(repository);
const controller = new FavoritoController(service);

favoritoRouter.get('/', verificarTokenMiddleware, controller.obtenerFavoritos);
favoritoRouter.post('/', verificarTokenMiddleware, controller.agregarFavorito);
favoritoRouter.delete('/:productoId', verificarTokenMiddleware, controller.eliminarFavorito);
