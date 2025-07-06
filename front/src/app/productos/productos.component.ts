import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, switchMap, combineLatest } from 'rxjs';

import { Producto, TipoProducto } from './productos.model';
import { ProductoService, TipoProductoService } from './productos.service';
import { RouterModule } from '@angular/router';

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

  constructor(
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService
  ) {
    this.productos$ = combineLatest([this.filtro$, this.orden$]).pipe(
      switchMap(([tipoId, orden]) => {
        return this.productoService.getProducts(tipoId, orden?.sortBy, orden?.sortOrder);
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
}
