import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormRegistroComponent } from "./form-registro/form-registro.component";
import { FormInicioSesionComponent } from "./form-inicio-sesion/form-inicio-sesion.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormInicioSesionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'taller-2';
}
