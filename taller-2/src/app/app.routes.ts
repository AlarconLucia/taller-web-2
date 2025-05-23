import { Routes } from '@angular/router';
import { FormRegistroComponent } from './form-registro/form-registro.component';
import { FormInicioSesionComponent } from './form-inicio-sesion/form-inicio-sesion.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'inicio-sesion',
        pathMatch: 'full'
    },
    {
        path: 'inicio-sesion',
        component: FormInicioSesionComponent
    },
    {
        path: 'registro',
        component: FormRegistroComponent
    }
];
