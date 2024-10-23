import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditausuarioComponent } from './components/usuario/creaeditausuario/creaeditausuario.component';

export const routes: Routes = [
    {
        path: 'usuario',component:UsuarioComponent,
        children:[{
            path:'nuevo',component:CreaeditausuarioComponent
        }]
    }
];
