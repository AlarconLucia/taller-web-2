import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, switchMap, combineLatest, debounceTime, distinctUntilChanged } from 'rxjs';
import { Producto, TipoProducto } from './productos.model';
import { ProductoService, TipoProductoService } from './productos.service';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
 public productos$: Observable<Producto[]>;
  public tiposProducto$: Observable<TipoProducto[]>;
  private filtro$ = new BehaviorSubject<number | null>(null);
  private orden$ = new BehaviorSubject<{ sortBy: string; sortOrder: string } | null>(null);
  private busqueda$ = new BehaviorSubject<string | null>(null);

  constructor(
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService,
    private carritoService: CarritoService
  ) {
    this.productos$ = combineLatest([this.filtro$, this.orden$, this.busqueda$]).pipe(
      switchMap(([tipoId, orden, query]) => {
        console.log('Filtro:', tipoId, 'Orden:', orden, 'Query:', query);
        return this.productoService.getProducts(tipoId, orden?.sortBy, orden?.sortOrder, query);
      })
    );
    this.tiposProducto$ = this.tipoProductoService.getTiposProducto();
  }

  aplicarFiltro(tipoId: number | null): void {
    this.filtro$.next(tipoId);
  }

  aplicarOrden(event: Event): void {
    const valor = (event.target as HTMLSelectElement).value;
    if (valor) {
      const [sortBy, sortOrder] = valor.split('-');
      this.orden$.next({ sortBy, sortOrder });
    } else {
      this.orden$.next(null);
    }
  }

  aplicarBusqueda(termino: string): void {
    this.busqueda$.next(termino.trim() ? termino.trim() : null);
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarAlCarrito(producto);
    console.log(`${producto.nombre} agregado al carrito!`);
  }
}
