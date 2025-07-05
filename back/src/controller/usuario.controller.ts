import { Request } from "express";
import { Response } from "express";
import { UsuarioRepository } from "../repository/usuario.repository";
import { UsuarioService } from "../services/usuario.service";
import jwt from 'jsonwebtoken';
import { usuario } from '../generated/prisma/index';

const usuarioRepository = new UsuarioRepository()
const usuarioService = new UsuarioService(usuarioRepository);
const SECRET = 'Alarcon-Vara';

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

    public login = async (_req: Request, res: Response) => {
        const { email, password } = _req.body;
        try {
            const usuario = await usuarioService.buscarUsuario(email, password);
            if (!usuario) {
                res.status(401).json({ mensaje: 'Email y/o contraseña incorrectos' });
                return;
            }

            const token = this.generarToken(usuario);

            res.json({
                token,
                usuario: {
                    id: usuario?.id,
                    nombre: usuario?.nombre,
                    email: usuario?.email,
                }
            });
        } catch (error) {
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    }

    public cambiarPassword = async (_req: Request, res: Response) => {
        const { email, passwNueva } = _req.body;

        try {
            const usuario = await usuarioService.cambiarPassword(email, passwNueva);

            if (!usuario) {
                return res.status(404).json({ mensaje: 'El email no está registrado' });
            }

            res.status(200).json({ mensaje: 'Contraseña cambiada correctamente' });
        } catch (error) {
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    };


    private generarToken(usuario: { id: number; email: string | null; nombre?: string | null }): string {
        return jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                nombre: usuario.nombre
            },
            SECRET,
            {
                expiresIn: '1h'
            }
        );
    }

}

