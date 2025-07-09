import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, TipoProducto } from './interfaces/productos.model';
import { environment } from '../../../environments/environment.development';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/productos`;

  getProducts(
    tipoProductoId?: number | null,
    sortBy?: string,
    sortOrder?: string,
    query?: string | null,
    page: number = 1
  ): Observable<PaginatedResponse<Producto>> {

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
    params = params.set('page', page.toString());

    return this.http.get<PaginatedResponse<Producto>>(this.apiUrl, { params });
  }

  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/ver-producto/${id}`);
  }

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
  private apiUrl = `${environment.api_url}/tipos-producto`;

  getTiposProducto(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.apiUrl);
  }
}
