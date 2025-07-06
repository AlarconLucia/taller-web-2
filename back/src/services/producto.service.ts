import { ProductoRepository } from "../repository/producto.repository";

export class ProductoService {
  constructor(private productoRepository: ProductoRepository) {}

 async findAll(tipoProductoId?: number, sortBy?: string, sortOrder?: 'asc' | 'desc', query?: string) {
    return this.productoRepository.findAll(tipoProductoId, sortBy, sortOrder, query);
  }
}
