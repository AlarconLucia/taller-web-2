import { PedidoRepository } from "../repository/pedido.repository";
import { prisma } from "../prisma";

interface CartItem {
  producto: number;
  cantidad: number;
}

export class PedidoService {
  constructor(private pedidoRepository: PedidoRepository) {}

  async crearPedido(usuarioId: number, items: CartItem[]) {
    const productoIds = items.map(item => item.producto);

    const productosEnDB = await prisma.producto.findMany({
      where: {
        id: { in: productoIds },
      },
    });

    let total = 0;
    const itemsConPrecio = items.map(item => {
      const productoDB = productosEnDB.find(p => p.id === item.producto);
      if (!productoDB || !productoDB.precio) {
        throw new Error(`Producto con ID ${item.producto} no encontrado o sin precio.`);
      }
      total += Number(productoDB.precio) * item.cantidad;
      return {
        productoId: item.producto,
        cantidad: item.cantidad,
        precio: Number(productoDB.precio)
      };
    });
    
    return this.pedidoRepository.crearPedido(usuarioId, itemsConPrecio, total);
  }
}