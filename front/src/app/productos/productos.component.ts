import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, BehaviorSubject, switchMap, combineLatest, tap } from 'rxjs';

import { ProductoService, TipoProductoService } from '../services/productos.service';
import { CarritoService } from '../services/carrito.service';
import { Producto, TipoProducto } from './productos.model';

// 1. Definimos la forma que tendrá nuestro estado guardado
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

  // 2. Definimos la clave para el localStorage
  private readonly FILTROS_STORAGE_KEY = 'filtros_productos_nova_shop';

  // Subjects que manejarán el estado
  private filtro$: BehaviorSubject<number | null>;
  private orden$: BehaviorSubject<{ sortBy: string; sortOrder: string } | null>;
  private busqueda$: BehaviorSubject<string | null>;

  constructor(
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService,
    private carritoService: CarritoService,
    @Inject(PLATFORM_ID) private platformId: object // Inyectamos para saber si estamos en el navegador
  ) {
    // 3. Cargamos el estado inicial desde el storage
    const estadoInicial = this.cargarEstadoDesdeStorage();

    // 4. Inicializamos los Subjects con el estado guardado o valores por defecto
    this.filtro$ = new BehaviorSubject(estadoInicial.tipoId);
    this.orden$ = new BehaviorSubject(estadoInicial.orden);
    this.busqueda$ = new BehaviorSubject(estadoInicial.query);

    // 5. El flujo reactivo ahora también guarda el estado cada vez que cambia
    this.productos$ = combineLatest([
      this.filtro$,
      this.orden$,
      this.busqueda$
    ]).pipe(
      // El operador 'tap' nos permite ejecutar una acción sin modificar el flujo de datos
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

  // Métodos para actualizar el estado (estos no cambian)
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
  }

  // --- Métodos para manejar el localStorage ---

  private guardarEstadoEnStorage(estado: FiltrosEstado): void {
    // Solo guardamos si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.FILTROS_STORAGE_KEY, JSON.stringify(estado));
    }
  }

  private cargarEstadoDesdeStorage(): FiltrosEstado {
    // Solo cargamos si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const estadoGuardado = localStorage.getItem(this.FILTROS_STORAGE_KEY);
      if (estadoGuardado) {
        return JSON.parse(estadoGuardado);
      }
    }
    // Si no estamos en el navegador o no hay nada guardado, devolvemos el estado por defecto
    return { tipoId: null, orden: null, query: null };
  }
}
