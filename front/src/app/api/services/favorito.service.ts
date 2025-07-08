import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Producto } from './interfaces/productos.model';

export interface FavoritoItem {
  usuarioId: number;
  productoId: number;
  agregadoEn: Date;
  producto: Producto;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/favoritos`;

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getFavoritos(): Observable<FavoritoItem[]> {
    return this.http.get<FavoritoItem[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  agregarFavorito(productoId: number): Observable<any> {
    return this.http.post(this.apiUrl, { productoId }, { headers: this.getAuthHeaders() });
  }

  eliminarFavorito(productoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productoId}`, { headers: this.getAuthHeaders() });
  }
}
