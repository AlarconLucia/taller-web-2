import { FavoritoRepository } from "../repository/favorito.repository";

export class FavoritoService {
  constructor(private favoritoRepository: FavoritoRepository) {}

  async findByUsuarioId(usuarioId: number) {
    return this.favoritoRepository.findByUsuarioId(usuarioId);
  }

  async agregar(usuarioId: number, productoId: number) {
    return this.favoritoRepository.agregar(usuarioId, productoId);
  }

  async eliminar(usuarioId: number, productoId: number) {
    return this.favoritoRepository.eliminar(usuarioId, productoId);
  }
}
