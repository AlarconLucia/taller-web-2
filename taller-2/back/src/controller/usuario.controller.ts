import { Request } from "express";
import { Response } from "express";
import { UsuarioRepository } from "../repository/usuario.repository";
import { UsuarioService } from "../service/usuario.service";
import { prisma } from "../prisma";

const usuarioRepository = new UsuarioRepository()
const usuarioService = new UsuarioService(usuarioRepository);

export class UsuarioController {
    constructor() { };

    public registrarUsuario = async (_req: Request, res: Response) => {

        try {
            const empleado = await usuarioService.crearUsuario(_req.body)
            res.json(200).json(empleado)
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'El email ya está siendo usado por otro usuario', error })
        }
    }
}