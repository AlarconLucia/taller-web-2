import { Request } from "express";
import { Response } from "express";
import { UsuarioRepository } from "../repository/usuario.repository";
import { UsuarioService } from "../service/usuario.service";
import { prisma } from "../prisma";
import { usuario } from '../generated/prisma/index';

const usuarioRepository = new UsuarioRepository()
const usuarioService = new UsuarioService(usuarioRepository);

export class UsuarioController {
    constructor() { };

    public registrarUsuario = async (_req: Request, res: Response) => {

        try {
            const usuario = await usuarioService.crearUsuario(_req.body)
            res.json(200).json(usuario)
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'Ocurrió un error inesperado' });
            }
        }
    }
}