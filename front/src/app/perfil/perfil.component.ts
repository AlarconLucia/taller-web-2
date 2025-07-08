import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { UsuarioService } from '../api/services/usuario.service';
import { FavoritoService, FavoritoItem } from '../api/services/favorito.service';
import { PedidoService } from '../api/services/pedido.service';
import { Usuario } from "../modules/usuarios/interface/usuario.interface";

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private favoritoService = inject(FavoritoService);
  private pedidoService = inject(PedidoService);

  public usuario: Usuario | null = null;
  public favoritos$: Observable<FavoritoItem[]>;
  public historial$: Observable<any[]>;

  constructor() {
    this.favoritos$ = this.favoritoService.getFavoritos();
    this.historial$ = this.pedidoService.getHistorial();
  }

  ngOnInit(): void {
    this.usuario = this.usuarioService.obtenerUsuarioLogueado();
  }

  eliminarFavorito(productoId: number): void {
    this.favoritoService.eliminarFavorito(productoId).subscribe({
      next: () => {
        this.favoritos$ = this.favoritoService.getFavoritos();
      },
      error: (err) => console.error("Error al eliminar el favorito", err)
    });
  }
}
