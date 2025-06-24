import { Router } from "express";
import { UsuarioController } from "../../controller/usuario.controller";

export const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.post('/registro', usuarioController.registrarUsuario.bind(usuarioController));
usuarioRouter.get('/', (req, res) => {
    res.redirect('/inicio-sesion');
});
usuarioRouter.post('/login', usuarioController.login.bind(usuarioController))
