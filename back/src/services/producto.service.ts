import { ProductoRepository } from "../repository/producto.repository";
import { producto } from '../generated/prisma/index';

export class ProductoService {
  constructor(private productoRepository: ProductoRepository) {}

 async findAll(tipoProductoId?: number, sortBy?: string, sortOrder?: 'asc' | 'desc', query?: string) {
    return this.productoRepository.findAll(tipoProductoId, sortBy, sortOrder, query);
  }

    async obtenerProductoPorId(id: number) {
    return this.productoRepository.obtenerProductoporId(id);
  }

    crearProducto(producto: { nombre: string; descripcion: string; precio: number; tipo: number; }) {
    return this.productoRepository.crearProducto(producto);
  }
}
