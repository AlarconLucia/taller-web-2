import { ProductoRepository } from "../repository/producto.repository";

export class ProductoService {
  constructor(private productoRepository: ProductoRepository) {}

  async findAll() {
    const products = await this.productoRepository.findAll();
    return products;
  }
}
