import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-form-registro',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './form-registro.component.html',
  styleUrl: './form-registro.component.css'
})
export class FormRegistroComponent {
  registro = signal<FormGroup>(
    new FormGroup(
      {
        name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
        lastName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
        address: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
        email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
        password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),

      }
    )
  );
}
