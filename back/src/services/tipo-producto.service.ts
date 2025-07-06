import { TipoProductoRepository } from "../repository/tipo-producto.repository";

export class TipoProductoService {
  constructor(private tipoProductoRepository: TipoProductoRepository) {}
  async findAll() {
    return this.tipoProductoRepository.findAll();
  }
}
