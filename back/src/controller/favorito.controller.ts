import { Response } from "express";
import { FavoritoService } from "../services/favorito.service";
import { RequestConUsuario } from "../middlewares/auth.middleware";

export class FavoritoController {
  constructor(private favoritoService: FavoritoService) {}

  // --- OBTENER FAVORITOS ---
  public obtenerFavoritos = async (req: RequestConUsuario, res: Response): Promise<void> => {
    const usuarioId = req.usuario?.id;
    if (!usuarioId) {
      res.status(401).json({ message: "No autorizado" });
      return;
    }
    try {
      const favoritos = await this.favoritoService.findByUsuarioId(usuarioId);
      res.status(200).json(favoritos);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los favoritos" });
    }
  };

  public agregarFavorito = async (req: RequestConUsuario, res: Response): Promise<void> => {
    const usuarioId = req.usuario?.id;
    const { productoId } = req.body;

    if (!usuarioId || !productoId) {
      res.status(400).json({ message: "Faltan datos para agregar el favorito" });
      return;
    }
    try {
      await this.favoritoService.agregar(usuarioId, productoId);
      res.status(201).json({ message: "Producto agregado a favoritos" });
    } catch (error) {
      res.status(409).json({ message: "Este producto ya está en tus favoritos" });
    }
  };

  public eliminarFavorito = async (req: RequestConUsuario, res: Response): Promise<void> => {
    const usuarioId = req.usuario?.id;
    const productoId = parseInt(req.params.productoId, 10);

    if (!usuarioId || !productoId) {
      res.status(400).json({ message: "Faltan datos para eliminar el favorito" });
      return;
    }
    try {
      await this.favoritoService.eliminar(usuarioId, productoId);
      res.status(200).json({ message: "Producto eliminado de favoritos" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el favorito" });
    }
  };
}
