import { UsuarioRepository } from '../repository/usuario.repository';

export class UsuarioService {
    constructor(private usuarioRepository: UsuarioRepository) { }

    async crearEmpleado(usuario: {
    nombre: string;
    apellido: string;
    direccion: string;
    email: string;
    passw: string;
  }) {
        return this.usuarioRepository.crearUsuario(usuario);
    }
}
