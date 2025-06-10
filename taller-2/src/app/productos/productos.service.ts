import { Injectable, signal } from '@angular/core';
import { Producto } from './productos.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Camiseta', color: 'Rojo', precio: 100 },
    { id: 2, nombre: 'Pantalón', color: 'Azul', precio: 150 },
    { id: 3, nombre: 'Zapato', color: 'Negro', precio: 200 },
    { id: 4, nombre: 'Gorra', color: 'Rojo', precio: 50 },
    // Agregá más si querés
  ];

  private productosFiltrados = signal<Producto[]>(this.productos);

  getProductos() {
    return this.productosFiltrados.asReadonly();
  }

  filtrar(nombre: string, color: string) {
    const filtrados = this.productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(nombre.toLowerCase()) &&
        (color ? p.color.toLowerCase() === color.toLowerCase() : true)
    );
    this.productosFiltrados.set(filtrados);
  }

  limpiarFiltro() {
    this.productosFiltrados.set(this.productos);
  }
}
