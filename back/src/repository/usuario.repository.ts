import { prisma } from "../prisma";

export class UsuarioRepository {
    cambiarPassword(email: string, passwNueva: string) {
        return prisma.usuario.update({
            where: { email: email },
            data: { passw: passwNueva }
        })
    }
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

    async verificarEmailYPassword(emailAVerificar: string, passwordAVerificar: string) {
        if (this.emailYaUsado != null) {
            return prisma.usuario.findUnique({
                where: { email: emailAVerificar, passw: passwordAVerificar },
                select: { nombre: true, id: true, email: true }
            })
        }
    }
}