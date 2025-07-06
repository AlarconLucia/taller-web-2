import { prisma } from "../prisma";

export class ProductoRepository {
  async findAll(tipoProductoId?: number, sortBy?: string, sortOrder?: 'asc' | 'desc') {
    const whereClause: { tipo?: number } = {};
    if (tipoProductoId) {
      whereClause.tipo = tipoProductoId;
    }
    const orderByClause: { [key: string]: 'asc' | 'desc' } = {};
    
    if (sortBy && sortOrder) {
      orderByClause[sortBy] = sortOrder;
    }

    return prisma.producto.findMany({
      where: whereClause,
      orderBy: orderByClause,
      include: {
        tipo_producto: { select: { tipo: true } },
      },
    });
  }
}