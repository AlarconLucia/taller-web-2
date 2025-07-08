import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

interface PedidoItem {
  producto: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/pedidos`;

  crearPedido(items: PedidoItem[]): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.apiUrl, { items }, { headers });
  }
}
