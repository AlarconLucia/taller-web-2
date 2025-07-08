import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../../api/services/interfaces/productos.model';

export interface CartItem {
  producto: Producto;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private readonly CARRITO_STORAGE_KEY = 'carrito_nova_shop';

  private _items$ = new BehaviorSubject<CartItem[]>([]);
  public items$ = this._items$.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarCarritoDesdeStorage();
    }
  }

  private cargarCarritoDesdeStorage(): void {
    const carritoGuardado = localStorage.getItem(this.CARRITO_STORAGE_KEY);
    if (carritoGuardado) {
      this._items$.next(JSON.parse(carritoGuardado));
    }
  }

  private guardarCarrito(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.CARRITO_STORAGE_KEY, JSON.stringify(this._items$.getValue()));
    }
  }

    agregarAlCarrito(producto: Producto, cantidad: number = 1): void {
    const items = this._items$.getValue();
    const itemExistente = items.find(i => i.producto.id === producto.id);

    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      items.push({ producto, cantidad: cantidad });
    }

    this._items$.next(items);
    this.guardarCarrito();
  }

   eliminarItem(productoId: number): void {
    const itemsActuales = this._items$.getValue();
    const itemsFiltrados = itemsActuales.filter(i => i.producto.id !== productoId);
    this._items$.next(itemsFiltrados);
    this.guardarCarrito();
  }

  vaciarCarrito(): void {
    this._items$.next([]);
    this.guardarCarrito();
  }

    getItemsParaPedido(): { producto: number, cantidad: number }[] {
    const items = this._items$.getValue();
    return items.map(item => ({
      producto: item.producto.id,
      cantidad: item.cantidad
    }));
  }
}
