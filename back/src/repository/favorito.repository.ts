import { prisma } from "../prisma";

export class FavoritoRepository {

  async findByUsuarioId(usuarioId: number) {
    return prisma.favorito.findMany({
      where: {
        usuarioId: usuarioId,
      },
      include: {
        producto: true,
      },
    });
  }

  async agregar(usuarioId: number, productoId: number) {
    return prisma.favorito.create({
      data: {
        usuarioId: usuarioId,
        productoId: productoId,
      },
    });
  }

  async eliminar(usuarioId: number, productoId: number) {
    return prisma.favorito.delete({
      where: {
        usuarioId_productoId: {
          usuarioId: usuarioId,
          productoId: productoId,
        },
      },
    });
  }
}
