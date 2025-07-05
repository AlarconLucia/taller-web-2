import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UsuarioRest } from "./interfaces/usuario.interfaces.rest";
import { map } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { Usuario } from "../../../modules/usuarios/interface/usuario.interface";
import { response } from "express";

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    http = inject(HttpClient)

    constructor() { }

    registrarUsuario(usuario: Usuario) {
        let headers = new HttpHeaders();

        headers = headers.append(
            'Authorization',
            'Bearer ' + localStorage.getItem('token')
        )

        return this.http.post<UsuarioRest>(`${environment.api_url}/usuario/registro`, usuario,
            {
                headers: headers
            }
        ).pipe(
            map((res) => {
                return res
            }),
        )
    }

    iniciarSesion(email: string, password: string) {
        return this.http.post<any>(`${environment.api_url}/usuario/login`, { email, password })
            .pipe(
                map(response => {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('usuario', JSON.stringify(response.usuario));
                    return response.usuario;
                })
            );
    }

    cerrarSesion() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    }

    cambiarPassword(email: string, passwNueva: string) {
        return this.http.post<any>(`${environment.api_url}/usuario/cambiar-contrasena`, { email, passwNueva })
            .pipe(
                map((res) => {
                    return res
                }),
            )
    }
}