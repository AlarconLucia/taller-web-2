// src/app/services/product.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from './interfaces/productos.model';
import { TipoProducto } from './interfaces/productos.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/productos';

  getProducts(
    tipoProductoId?: number | null, sortBy?: string, sortOrder?: string, query?: string | null): Observable<Producto[]> {
    let params = new HttpParams();
    if (tipoProductoId) {
      params = params.set('tipoProductoId', tipoProductoId.toString());
    }
    if (sortBy && sortOrder) {
      params = params.set('sortBy', sortBy);
      params = params.set('sortOrder', sortOrder);
    }
    if (query) {
      params = params.set('q', query);
    }
    return this.http.get<Producto[]>(`${environment.api_url}/productos/`, { params });
  }

  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${environment.api_url}/productos/ver-producto/${id}`)
  }

 // 👇 MÉTODO MODIFICADO
  registrarProducto(formData: FormData): Observable<Producto> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Producto>(`${this.apiUrl}/registro`, formData, { headers });
  }
}

@Injectable({
  providedIn: 'root',
})
export class TipoProductoService {
  private http = inject(HttpClient);

  getTiposProducto(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(`${environment.api_url}/tipos-producto`);
  }
}
