import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { Producto } from './productos.model';
import { ProductoService } from './productos.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  private productosService = inject(ProductoService);
  public productos$!: Observable<Producto[]>;

  ngOnInit(): void {
    this.productos$ = this.productosService.getProducts();
  }
}
