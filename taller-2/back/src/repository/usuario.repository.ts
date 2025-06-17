import { prisma } from "../prisma";

export class UsuarioRepository {
    async crearUsuario(usuario: { nombre: string; apellido: string; direccion: string; email: string; passw: string; }) {
        return prisma.usuario.create({
            data: usuario,
        });
    }
}