import { UsuarioRepository } from '../repository/usuario.repository';

export class UsuarioService {
    constructor(private usuarioRepository: UsuarioRepository) { }

    async crearUsuario(usuario: {
        nombre: string;
        apellido: string;
        direccion: string;
        email: string;
        passw: string;
    }) {
        const emailEnUso = await this.usuarioRepository.emailYaUsado(usuario.email);

        if (emailEnUso) {
            throw new Error('El email ya está siendo usado por otro usuario');
        }

        return this.usuarioRepository.crearUsuario(usuario);
    }
}
