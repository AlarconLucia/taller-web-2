import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsuarioService } from '../../api/services/usuario.service';
import { CarritoService } from '../../api/services/carrito.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public totalItemsEnCarrito$: Observable<number>;

  constructor(
    private router: Router,
    private carritoService: CarritoService,
    public usuarioService: UsuarioService
  ) {
    this.totalItemsEnCarrito$ = this.carritoService.items$.pipe(
      map(items => items.reduce((total, item) => total + item.cantidad, 0))
    );
  }

  onClick() {
    localStorage.removeItem('filtros_productos_nova_shop');
    this.usuarioService.cerrarSesion();
    this.router.navigate(['/inicio-sesion']);
  }
}
