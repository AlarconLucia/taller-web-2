import { Component, inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ProductoService, TipoProductoService } from '../api/services/productos.service';
import { Producto, TipoProducto } from '../api/services/interfaces/productos.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  private tipoProductoService = inject(TipoProductoService);
  tipos: TipoProducto[] | null = null;
  imagenSeleccionada: File | null = null;
  private productoService = inject(ProductoService);
  mensajeError: string | null = null;
  mensajeExito : string | null = null

  ngOnInit(): void {
    this.tipoProductoService.getTiposProducto().subscribe({
      next: (_res: TipoProducto[]) => {
        this.tipos = _res;
      }
    })
  }

  nuevoProducto = signal<FormGroup>(
    new FormGroup({
      nombre: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      }),
      descripcion: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      }),
      precio: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      tipo: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    })
  )

  onFileChange($event: Event): void {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenSeleccionada = input.files[0];
    }
  }

  onSubmit() {
  const form = this.nuevoProducto();
  if (form.valid && this.imagenSeleccionada) {
    const formData = new FormData();
    formData.append('nombre', form.value.nombre);
    formData.append('descripcion', form.value.descripcion);
    formData.append('precio', form.value.precio.toString());
    formData.append('tipo', form.value.tipo.toString());
    formData.append('imagen', this.imagenSeleccionada);

    this.productoService.registrarProducto(formData).subscribe({
      next: (res: Producto) => {
        console.log('Producto registrado:', res);
        this.mensajeExito = '¡Registro exitoso!';
        this.mensajeError = null;
      },
      error: (err: { error: { message: string } }) => {
        console.error('Error en registro:', err);
        this.mensajeError = err.error?.message || 'Error al registrar el producto';
      }
    });
  } else {
    if (!this.imagenSeleccionada) {
      this.mensajeError = 'Seleccioná una imagen';
    }
    form.markAllAsTouched();
  }
}

}
