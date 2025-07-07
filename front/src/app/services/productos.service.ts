// src/app/services/product.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../productos/productos.model';
import { TipoProducto } from '../productos/productos.model';

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
    return this.http.get<Producto[]>(this.apiUrl, { params });
  }
}

@Injectable({
  providedIn: 'root',
})
export class TipoProductoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/tipos-producto';

  getTiposProducto(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.apiUrl);
  }
}
