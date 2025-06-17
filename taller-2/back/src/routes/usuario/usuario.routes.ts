import { Router } from "express";
import { UsuarioController } from "../../controller/usuario.controller";

export const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.post('/registro', usuarioController.registrarUsuario.bind(usuarioController));