import { Usuario } from "../../../../modules/usuarios/interface/usuario.interface";
import { UsuarioRest } from "../interfaces/usuario.interfaces.rest";

export class UsuarioMapper {
    static mapUsuarioToUsuario (usuarioRest : UsuarioRest) : Usuario {
        return {
            id : usuarioRest.id,
            name : usuarioRest.name, 
            lastName : usuarioRest.lastName,
            address : usuarioRest.address,
            email : usuarioRest.email,
            password : usuarioRest.password
        }
    }
}