import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from './productos.service';
import { Producto } from './productos.model';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
})
export class ProductoComponent {
  nombre = '';
  color = '';
  colores = ['Rojo', 'Azul', 'Negro'];

  productos: any;

  constructor(private productoService: ProductoService) {
    this.productos = this.productoService.getProductos();
  }

  buscar() {
    this.productoService.filtrar(this.nombre, this.color);
  }

  limpiar() {
    this.nombre = '';
    this.color = '';
    this.productoService.limpiarFiltro();
  }
}
