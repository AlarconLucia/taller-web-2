import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-inicio-sesion',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './form-inicio-sesion.component.html',
  styleUrl: './form-inicio-sesion.component.css',
})
export class FormInicioSesionComponent {
  constructor(private router: Router) {}

  onSubmit() {
    const loginExitoso = true;

    if (loginExitoso) {
      this.router.navigate(['/inicio']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
