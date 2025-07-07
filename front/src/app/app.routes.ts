import { Routes } from '@angular/router';
import { FormRegistroComponent } from './form-registro/form-registro.component';
import { FormInicioSesionComponent } from './form-inicio-sesion/form-inicio-sesion.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { CambioPasswordComponent } from './cambio-password/cambio-password.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio-sesion',
    pathMatch: 'full',
  },
  {
    path: 'inicio-sesion',
    component: FormInicioSesionComponent,
  },
  {
    path: 'registro',
    component: FormRegistroComponent,
  },
  {
    path: 'cambiar-contrasena',
    component: CambioPasswordComponent,
  },

  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [authGuard],
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'ver-producto/:id',
    component: DetalleProductoComponent,
    canActivate: [authGuard],
  },
];
