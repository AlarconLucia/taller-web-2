import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CarritoService, CartItem } from '../api/services/carrito.service';
import { PedidoService } from '../api/services/pedido.service';
import { UsuarioService } from '../api/services/usuario.service';

@Component({
  selector: 'app-carrito-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito-modal.component.html',
  styleUrls: ['./carrito-modal.component.css']
})
export class CarritoModalComponent {
  private carritoService = inject(CarritoService);
  private pedidoService = inject(PedidoService);
  private usuarioService = inject(UsuarioService);

  public items$: Observable<CartItem[]>;
  public mensajeExito: string | null = null;
  public mensajeError: string | null = null;

  constructor() {
    this.items$ = this.carritoService.items$;
  }

  eliminarDelCarrito(productoId: number): void {
    this.carritoService.eliminarItem(productoId);
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
  }

  finalizarCompra(): void {
    this.mensajeExito = null;
    this.mensajeError = null;

    const itemsParaPedido = this.carritoService.getItemsParaPedido();
    if (itemsParaPedido.length === 0) {
      this.mensajeError = "Tu carrito está vacío.";
      return;
    }

    this.pedidoService.crearPedido(itemsParaPedido).subscribe({
      next: (respuesta) => {
        this.mensajeExito = "¡Compra finalizada con éxito! Tu pedido ha sido registrado.";
        this.carritoService.vaciarCarrito();
      },
      error: (err) => {
        this.mensajeError = "Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.";
        console.error("Error al finalizar la compra:", err);
      }
    });
  }
}
