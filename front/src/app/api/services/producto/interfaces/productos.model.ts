export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  tipo_producto: {
    tipo: string;
  };
}

export interface TipoProducto {
  id: number;
  tipo: string;
}
