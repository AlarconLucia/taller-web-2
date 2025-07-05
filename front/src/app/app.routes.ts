import { Routes } from '@angular/router';
import { FormRegistroComponent } from './form-registro/form-registro.component';
import { FormInicioSesionComponent } from './form-inicio-sesion/form-inicio-sesion.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoComponent } from './productos/productos.component';
import { CambioPasswordComponent } from './cambio-password/cambio-password.component';

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
    path: 'inicio',
    component: InicioComponent,
  },
  {
    path: 'productos',
    component: ProductoComponent,
  },
  {
    path: 'cambiar-contrasena',
    component: CambioPasswordComponent,
  },
];
