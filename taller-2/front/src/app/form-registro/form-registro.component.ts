import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-form-registro',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './form-registro.component.html',
  styleUrl: './form-registro.component.css',
})
export class FormRegistroComponent {
  registro = signal<FormGroup>(
    new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      lastName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      address: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(5)],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(5), contieneNumero, contieneMayusculaYMinuscula],
      }),
    })
  );
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