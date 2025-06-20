import { prisma } from "../prisma";

export class UsuarioRepository {
    async emailYaUsado(emailAVerificar: string): Promise<boolean> {
    const emailEncontrado = await prisma.usuario.findUnique({
        where: { email: emailAVerificar },
        select: { email: true }
    });

    return emailEncontrado !== null;
}


    async crearUsuario(usuario: { nombre: string; apellido: string; direccion: string; email: string; passw: string; }) {
        return prisma.usuario.create({
            data: usuario,
        });
    }
}