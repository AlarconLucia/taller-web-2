import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface RequestConUsuario extends Request {
  usuario?: any;
}

export const verificarTokenMiddleware = (req: RequestConUsuario, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.status(401).json({ message: 'Acceso denegado: No se proporcionó token.' });
    return;
  }

  const SECRET = "Alarcon-Vara"; 

  jwt.verify(token, SECRET, (err: any, usuario: any) => {
    if (err) {
      res.status(403).json({ message: 'Token no válido.' });
      return;
    }

    req.usuario = usuario;
    
    next();
  });
};