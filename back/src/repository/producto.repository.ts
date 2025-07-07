import { prisma } from "../prisma";

export class ProductoRepository {
  async findAll(tipoProductoId?: number, sortBy?: string, sortOrder?: 'asc' | 'desc', query?: string) {
    const whereClause: any = {};

    if (tipoProductoId) {
      whereClause.tipo = tipoProductoId;
    }

    if (query) {
      whereClause.OR = [
          { nombre: { contains: query } },
          { descripcion: { contains: query } },
      ];
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