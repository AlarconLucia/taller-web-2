import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../api/services/producto/productos.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../api/services/producto/interfaces/productos.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-producto',
  imports: [CommonModule],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})
export class DetalleProductoComponent implements OnInit {
  private router = inject(Router);
  private productoServicio = inject(ProductoService);
  private route = inject(ActivatedRoute);
  producto!: Producto;
  mensajeError: string | null = null;
  private id: number | 0 = 0;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoServicio.obtenerProductoPorId(this.id).subscribe({
      next: (_res: Producto) => {
        this.producto = _res;
      },
      error: (err: { error: { message: string; }; }) => {
        console.log('acá hay ', this.producto)
        console.error('Error el producto no existe:', err);
        this.mensajeError = err.error?.message || 'El Producto solicitado no existe';
      }
    })
  }
}