import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../api/services/usuario/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-registro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-registro.component.html',
  styleUrl: './form-registro.component.css',
})
export class FormRegistroComponent {
  private usuarioService = inject(UsuarioService);
  mensajeError: string | null = null;

  registro = signal<FormGroup>(
    new FormGroup({
      nombre: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      apellido: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      direccion: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(5)],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      passw: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(5), contieneNumero, contieneMayusculaYMinuscula],
      }),
    })
  );

  onSubmit() {
    const form = this.registro();
    if (form.valid) {
      const datos = form.value;
      this.usuarioService.registrarUsuario(datos).subscribe({
        next: (res) => {
          console.log('Usuario registrado:', res);
        },
        error: (err) => {
          console.error('Error en registro:', err);
          this.mensajeError = err.error?.message || 'Error al registrar el usuario';
        }
      });
    } else {
      form.markAllAsTouched();
    }
  }
}

export function contieneNumero(control: AbstractControl): ValidationErrors | null {
  const tieneNumero = /\d/.test(control.value);
  return tieneNumero ? null : { sinNumero: true };
}

export function contieneMayusculaYMinuscula(control: AbstractControl): ValidationErrors | null {
  const tieneMayuscula = /[A-Z]/.test(control.value);
  const tieneMinuscula = /[a-z]/.test(control.value);
  return tieneMayuscula && tieneMinuscula ? null : { sinMayusculaOMinuscula: true };
}