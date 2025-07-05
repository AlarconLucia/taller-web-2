import { prisma } from "../prisma";

export class ProductoRepository {
  async findAll() {
    return prisma.producto.findMany({
      include: {
        tipo_producto: {
          select: {
            tipo: true,
          },
        },
      },
    });
  }
}
