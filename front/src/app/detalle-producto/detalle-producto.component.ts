import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductoService } from '../api/services/productos.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../api/services/interfaces/productos.model';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../api/services/carrito.service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit {
  private router = inject(Router);
  private productoServicio = inject(ProductoService);
  private route = inject(ActivatedRoute);
  private carritoService = inject(CarritoService);

  producto!: Producto;
  mensajeError: string | null = null;
  private id: number = 0;

  // 1. Añadimos una propiedad para guardar la cantidad. Inicia en 1.
  public cantidad: number = 1;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoServicio.obtenerProductoPorId(this.id).subscribe({
      next: (_res: Producto) => {
        this.producto = _res;
      },
      error: (err: { error: { message: string; }; }) => {
        console.error('Error, el producto no existe:', err);
        this.mensajeError = err.error?.message || 'El Producto solicitado no existe';
      }
    })
  }

  // 2. Método para aumentar la cantidad
  incrementarCantidad(): void {
    this.cantidad++;
  }

  // 3. Método para disminuir la cantidad, con un límite de 1
  decrementarCantidad(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  // 4. Modificamos este método para que use la cantidad seleccionada
  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarAlCarrito(producto, this.cantidad);
    console.log(`${this.cantidad} x ${producto.nombre} agregado(s) al carrito.`);
  }
}
