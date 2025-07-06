import { prisma } from "../prisma";

export class TipoProductoRepository {
  async findAll() {
    return prisma.tipo_producto.findMany();
  }
}
