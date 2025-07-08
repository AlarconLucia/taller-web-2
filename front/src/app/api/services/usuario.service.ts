import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, inject, Injectable, PLATFORM_ID } from "@angular/core";
import { UsuarioRest } from "./interfaces/usuario.interfaces.rest";
import { map } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { Usuario } from "../../modules/usuarios/interface/usuario.interface";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

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

    estaLogueado(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

    cerrarSesion() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    }

    cambiarPassword(email: string, passwNueva: string) {
        return this.http.post<UsuarioRest>(`${environment.api_url}/usuario/cambiar-contrasena`, { email, passwNueva })
            .pipe(
                map((res) => {
                    return res
                }),
            )
    }

     obtenerIdUsuarioLogueado(): number | null {
    if (isPlatformBrowser(this.platformId)) {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        return usuario.id;
      }
    }
    return null;
  }
}
