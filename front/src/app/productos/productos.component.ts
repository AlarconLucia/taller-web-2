import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, switchMap, combineLatest, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { Producto, TipoProducto } from '../api/services/interfaces/productos.model';
import { CarritoService } from '../api/services/carrito.service';
import { ProductoService, TipoProductoService } from '../api/services/productos.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritoService } from '../api/services/favorito.service';


interface FiltrosEstado {
  tipoId: number | null;
  orden: { sortBy: string; sortOrder: string } | null;
  query: string | null;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  public productos$: Observable<Producto[]>;
  public tiposProducto$: Observable<TipoProducto[]>;
  private favoritoService = inject(FavoritoService);


  private readonly FILTROS_STORAGE_KEY = 'filtros_productos_nova_shop';

  private filtro$: BehaviorSubject<number | null>;
  private orden$: BehaviorSubject<{ sortBy: string; sortOrder: string } | null>;
  private busqueda$: BehaviorSubject<string | null>;

  constructor(
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService,
    private carritoService: CarritoService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    const estadoInicial = this.cargarEstadoDesdeStorage();

    this.filtro$ = new BehaviorSubject(estadoInicial.tipoId);
    this.orden$ = new BehaviorSubject(estadoInicial.orden);
    this.busqueda$ = new BehaviorSubject(estadoInicial.query);

    this.productos$ = combineLatest([
      this.filtro$,
      this.orden$,
      this.busqueda$
    ]).pipe(
      tap(([tipoId, orden, query]) => this.guardarEstadoEnStorage({ tipoId, orden, query })),
      switchMap(([tipoId, orden, query]) =>
        this.productoService.getProducts(
          tipoId,
          orden?.sortBy,
          orden?.sortOrder,
          query
        )
      )
    );

    this.tiposProducto$ = this.tipoProductoService.getTiposProducto();
  }

  aplicarFiltro(tipoId: number | null): void {
    this.filtro$.next(tipoId);
  }

  resetearFiltros(): void {
    this.filtro$.next(null);
    this.busqueda$.next(null);
    this.orden$.next(null);
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
  }


  private guardarEstadoEnStorage(estado: FiltrosEstado): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.FILTROS_STORAGE_KEY, JSON.stringify(estado));
    }
  }

  private cargarEstadoDesdeStorage(): FiltrosEstado {
    if (isPlatformBrowser(this.platformId)) {
      const estadoGuardado = localStorage.getItem(this.FILTROS_STORAGE_KEY);
      if (estadoGuardado) {
        return JSON.parse(estadoGuardado);
      }
    }
    return { tipoId: null, orden: null, query: null };
  }
   agregarAFavoritos(productoId: number): void {
    this.favoritoService.agregarFavorito(productoId).subscribe({
      next: () => console.log(`Producto ${productoId} agregado a favoritos`),
      error: (err) => console.error("Error al agregar a favoritos", err)
    });
  }
}
