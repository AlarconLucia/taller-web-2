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

        if (await this.emailEnUso(usuario.email)) {
            throw new Error('El email ya está siendo usado por otro usuario');
        }

        if (usuario.nombre.length < 3) {
            throw new Error('El nombre debe tener mínimo 3 caracteres')
        }

        if (usuario.apellido.length < 3) {
            throw new Error('El apellido debe tener mínimo 3 caracteres')
        }

        if (usuario.direccion.length < 5) {
            throw new Error('La dirección debe tener mínimo 5 caracteres')
        }

        if (await this.passwordInvalida(usuario.passw)) {
            throw new Error('La contraseña debe tener al menos 5 caracteres, una mayúscula, una minúscula y un número');
        }

        return this.usuarioRepository.crearUsuario(usuario);
    }

    buscarUsuario(email: string, password: string) {
        return this.usuarioRepository.verificarEmailYPassword(email, password)
    }

    private async emailEnUso(email: string): Promise<boolean> {
        const emailEnUso = await this.usuarioRepository.emailYaUsado(email);

        if (emailEnUso) {
            return true
        } else {
            return false
        }
    }

    async cambiarPassword(email: string, passwNueva: string) {
        const existe = await this.usuarioRepository.emailYaUsado(email);
        if (!existe) return null;

        return this.usuarioRepository.cambiarPassword(email, passwNueva);
    }


    private async passwordInvalida(password: string): Promise<boolean> {
        if (password.length < 5 ||
            !/[a-z]/.test(password) ||
            !/[A-Z]/.test(password) ||
            !/[0-9]/.test(password)) {
            return true
        } else {
            return false
        }
    }
}
