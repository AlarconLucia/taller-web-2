import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../api/services/usuario/usuario.service';

@Component({
  selector: 'app-form-inicio-sesion',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './form-inicio-sesion.component.html',
  styleUrl: './form-inicio-sesion.component.css',
})
export class FormInicioSesionComponent {
  constructor(private router: Router) { }
  private usuarioService = inject(UsuarioService);
  mensajeError: string | null = null;

  login = signal<FormGroup>(
    new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      passw: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    }));

  onSubmit() {
    const form = this.login();
    if (form.valid) {
      const datos = form.value;
      this.usuarioService.iniciarSesion(datos.email, datos.passw).subscribe({
        next: usuario => {
          const loginExitoso = true;
          console.log('Login exitoso', usuario);
          this.router.navigate(['/inicio']);
        },
        error: err => {
          console.error('Error de login', err);
          this.mensajeError = 'Email y/o contraseña incorrectos'
        }
      });
    }
  }
}
