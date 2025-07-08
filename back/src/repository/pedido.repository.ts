import { prisma } from "../prisma";

interface PedidoItem {
  productoId: number;
  cantidad: number;
  precio: number;
}

export class PedidoRepository {
  async crearPedido(usuarioId: number, items: PedidoItem[], total: number) {
    return prisma.$transaction(async (tx) => {
      const orden = await tx.orden.create({
        data: {
          usuarioId: usuarioId,
          total: total,
        },
      });

      const datosDetalles = items.map(item => ({
        ordenId: orden.id,
        productoId: item.productoId,
        cantidad: item.cantidad,
        precio: item.precio,
      }));

      await tx.detalleOrden.createMany({
        data: datosDetalles,
      });

      return orden;
    });
  }

 async findByUsuarioId(usuarioId: number) {
    return prisma.orden.findMany({
      where: {
        usuarioId: usuarioId,
      },
      include: {
        detalles: {
          include: {
            producto: true,
          },
        },
      },
      orderBy: {
        fecha: 'desc',
      },
    });
  }
}