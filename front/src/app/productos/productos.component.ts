import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, BehaviorSubject, switchMap, combineLatest, tap, map } from 'rxjs';
import { Producto, TipoProducto } from '../api/services/interfaces/productos.model';
import { ProductoService, TipoProductoService, PaginatedResponse } from '../api/services/productos.service';
import { CarritoService } from '../api/services/carrito.service';
import { FavoritoService } from '../api/services/favorito.service';

interface FiltrosEstado {
  tipoId: number | null;
  orden: { sortBy: string; sortOrder: string } | null;
  query: string | null;
  pagina: number;
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

  private filtro$: BehaviorSubject<number | null>;
  private orden$: BehaviorSubject<{ sortBy: string; sortOrder: string } | null>;
  private busqueda$: BehaviorSubject<string | null>;
  private pagina$: BehaviorSubject<number>;

  public paginaActual: number = 1;
  public totalPaginas: number = 1;
  public paginas: number[] = [];
  private readonly itemsPorPagina = 9;

  private readonly FILTROS_STORAGE_KEY = 'filtros_productos_nova_shop';

  constructor(
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService,
    private carritoService: CarritoService,
    private favoritoService: FavoritoService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    const estadoInicial = this.cargarEstadoDesdeStorage();

    this.filtro$ = new BehaviorSubject(estadoInicial.tipoId);
    this.orden$ = new BehaviorSubject(estadoInicial.orden);
    this.busqueda$ = new BehaviorSubject(estadoInicial.query);
    this.pagina$ = new BehaviorSubject(estadoInicial.pagina);

    this.tiposProducto$ = this.tipoProductoService.getTiposProducto();

    this.productos$ = combineLatest([
      this.filtro$,
      this.orden$,
      this.busqueda$,
      this.pagina$
    ]).pipe(
      tap(([tipoId, orden, query, pagina]) =>
        this.guardarEstadoEnStorage({ tipoId, orden, query, pagina })
      ),
      switchMap(([tipoId, orden, query, pagina]) =>
        this.productoService.getProducts(tipoId, orden?.sortBy, orden?.sortOrder, query, pagina)
      ),
      tap((response: PaginatedResponse<Producto>) => {
        this.paginaActual = this.pagina$.getValue();
        this.totalPaginas = Math.ceil(response.total / this.itemsPorPagina);
        this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
      }),
      map(response => response.data)
    );
  }


  aplicarFiltro(tipoId: number | null): void {
    this.pagina$.next(1);
    this.filtro$.next(tipoId);
  }

  aplicarOrden(event: Event): void {
    const valor = (event.target as HTMLSelectElement).value;
    this.pagina$.next(1);
    if (valor) {
      const [sortBy, sortOrder] = valor.split('-');
      this.orden$.next({ sortBy, sortOrder });
    } else {
      this.orden$.next(null);
    }
  }

  aplicarBusqueda(termino: string): void {
    this.pagina$.next(1);
    this.busqueda$.next(termino.trim() ? termino.trim() : null);
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.pagina$.next(nuevaPagina);
    }
  }

  resetearFiltros(): void {
    this.filtro$.next(null);
    this.busqueda$.next(null);
    this.orden$.next(null);
    this.pagina$.next(1);
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarAlCarrito(producto);
  }

  agregarAFavoritos(productoId: number): void {
    this.favoritoService.agregarFavorito(productoId).subscribe({
      next: () => console.log(`Producto ${productoId} agregado a favoritos`),
      error: (err) => console.error("Error al agregar a favoritos", err)
    });
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
    return { tipoId: null, orden: null, query: null, pagina: 1 };
  }
}
