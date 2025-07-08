import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CarritoService, CartItem } from '../api/services/carrito.service';

@Component({
  selector: 'app-carrito-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito-modal.component.html',
  styleUrls: ['./carrito-modal.component.css']
})
export class CarritoModalComponent {
  private carritoService = inject(CarritoService);
  public items$: Observable<CartItem[]>;

  constructor() {
    this.items$ = this.carritoService.items$;
  }

  eliminarDelCarrito(productoId: number): void {
    this.carritoService.eliminarItem(productoId);
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
  }
}
