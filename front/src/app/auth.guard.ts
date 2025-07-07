// archivo: src/app/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from './api/services/usuario/usuario.service';

export const authGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (usuarioService.estaLogueado()) {
    return true;
  }
  router.navigate(['/inicio-sesion']);
  return false;
};
