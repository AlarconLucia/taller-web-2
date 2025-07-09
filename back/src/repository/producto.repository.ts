import { prisma } from "../prisma";

export class ProductoRepository {
  async findAll(
    tipoProductoId?: number, 
    sortBy?: string, 
    sortOrder?: 'asc' | 'desc', 
    query?: string,
    page: number = 1,
    limit: number = 9
  ) {
    const skip = (page - 1) * limit;
    
    const conditions = [];
    if (tipoProductoId) { 
      conditions.push({ tipo: tipoProductoId }); 
    }
    if (query && query.trim() !== '') {
      conditions.push({
        OR: [
          { nombre: { contains: query } },
          { descripcion: { contains: query } },
        ],
      });
    }
    const whereClause = conditions.length > 0 ? { AND: conditions } : {};

    const orderByClause: { [key: string]: 'asc' | 'desc' } = {};
    if (sortBy && sortOrder) { 
      orderByClause[sortBy] = sortOrder; 
    }

    const [productos, total] = await prisma.$transaction([
      prisma.producto.findMany({
        where: whereClause,
        orderBy: orderByClause,
        skip: skip,
        take: limit,
        include: {
          tipo_producto: { select: { tipo: true } },
        },
      }),
      prisma.producto.count({ where: whereClause })
    ]);

    return { data: productos, total };
  }

  async obtenerProductoporId(idBuscado: number) {
    return await prisma.producto.findUnique({
      where: { id: idBuscado },
      include: {
        tipo_producto: {
          select: {
            tipo: true
          }
        }
      }
    })
  }

  crearProducto(producto: { nombre: string; descripcion: string; precio: number; tipo: number; }) {
    return prisma.producto.create({
      data: producto,
    });
  }
}
