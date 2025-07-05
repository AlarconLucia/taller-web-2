import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../api/services/usuario/usuario.service';

@Component({
  selector: 'app-cambio-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cambio-password.component.html',
  styleUrl: './cambio-password.component.css'
})
export class CambioPasswordComponent {
  constructor(private router: Router) { }
  private usuarioService = inject(UsuarioService);
  mensajeError: string | null = null;
  mensajeExito: string | null = null;

  cambioPassword = signal<FormGroup>(
    new FormGroup({
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email], })
      ,
      passwNueva: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(5), contieneNumero, contieneMayusculaYMinuscula],
      }),
    })
  )

  onSubmit() {
    const form = this.cambioPassword();
    if (form.valid) {
      const datos = form.value;
      this.usuarioService.cambiarPassword(datos.email, datos.passwNueva).subscribe({
        next: (res) => {
          console.log('Usuario registrado:', res);
          this.mensajeExito = '¡Contraseña cambiada exitosamente!'
          this.mensajeError = null;
        },
        error: (err) => {
          console.error('Error en cambio de contraseña:', err);
          this.mensajeError = err.error?.message || 'Ese email no está registrado';
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