import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, inject, signal, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../api/services/usuario.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-form-inicio-sesion',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-inicio-sesion.component.html',
  styleUrl: './form-inicio-sesion.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormInicioSesionComponent implements OnInit {
  public isBrowser: boolean;
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
      rememberMe: new FormControl(false)
    })
  );

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      import('@google/model-viewer');
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const rememberedEmail = localStorage.getItem('remembered_email');
      if (rememberedEmail) {
        this.login().get('email')?.setValue(rememberedEmail);
        this.login().get('rememberMe')?.setValue(true);
      }
    }
  }

  onSubmit() {
    const form = this.login();
    if (form.valid) {
      const datos = form.value;
      let rol: '';

      if (this.isBrowser) {
        if (datos.rememberMe) {
          localStorage.setItem('remembered_email', datos.email);
        } else {
          localStorage.removeItem('remembered_email');
        }
      }

      this.usuarioService.iniciarSesion(datos.email, datos.passw).subscribe({
        next: usuario => {
          console.log('Login exitoso', usuario);
          const usuarioJSON = localStorage.getItem('usuario');

          if (usuarioJSON) {
            const usuario = JSON.parse(usuarioJSON);
            if (usuario.tipo === 'admin') {
              this.router.navigate(['/inicio-admin']);
            } else {
              this.router.navigate(['/inicio']);
            }
          }
        },
        error: err => {
          console.error('Error de login', err);
          this.mensajeError = 'Email y/o contraseña incorrectos';
        }
      });
    }
  }
}
