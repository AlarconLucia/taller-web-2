import { Component , inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../api/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router){}
  private usuarioService = inject(UsuarioService); 
  onClick() {
    this.usuarioService.cerrarSesion();
    this.router.navigate(['/inicio-sesion']);
  }
}
