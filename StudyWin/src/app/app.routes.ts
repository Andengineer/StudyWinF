import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditausuarioComponent } from './components/usuario/creaeditausuario/creaeditausuario.component';
import { CanjeComponent } from './components/canje/canje.component';
import { CreaeditacanjeComponent } from './components/canje/creaeditacanje/creaeditacanje.component';

export const routes: Routes = [
    {
        path: 'usuario',component:UsuarioComponent,
        children:[{
            path:'nuevo',component:CreaeditausuarioComponent
        }]
    },
    {
        path: 'canje', component: CanjeComponent, // Ruta para listar los canjes
        children: [
            { path: 'nuevo', component: CreaeditacanjeComponent } // Ruta para crear/editar un canje
        ]
    },
    {
        path: 'curso', component: CanjeComponent, // Ruta para listar los canjes
        children: [
            { path: 'nuevo', component: CreaeditacanjeComponent } // Ruta para crear/editar un canje
        ]
    }
];
