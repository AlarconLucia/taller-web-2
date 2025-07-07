// src/app/services/product.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './productos.model';
import { TipoProducto } from './productos.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private http = inject(HttpClient);

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