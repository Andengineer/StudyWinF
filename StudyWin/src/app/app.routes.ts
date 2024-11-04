import { Routes } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CreaeditausuarioComponent } from './components/usuario/creaeditausuario/creaeditausuario.component';
import { CanjeComponent } from './components/canje/canje.component';
import { CreaeditacanjeComponent } from './components/canje/creaeditacanje/creaeditacanje.component';
import { CursoComponent } from './components/curso/curso.component';
import { CreaeditacursoComponent } from './components/curso/creaeditacurso/creaeditacurso.component';
import { AsociadoComponent } from './components/asociado/asociado.component';
import { PagemainComponent } from './components/mainpage/pagemain/pagemain.component';
import { CuestionarioacademicoComponent } from './components/cuestionarioacademico/cuestionarioacademico.component';
import { RecompensaComponent } from './components/recompensa/recompensa.component';
import { ListarCursoadminComponent } from './components/curso/listar-cursoadmin/listar-cursoadmin.component';

export const routes: Routes = [
    {
        path: 'usuario',component:UsuarioComponent,
        children:[{
            path:'nuevo',component:CreaeditausuarioComponent},
        {
            path:'ediciones/:id',component:CreaeditausuarioComponent
        }]
    },
    {
        path: 'canje', component: CanjeComponent, // Ruta para listar los canjes
        children: [
            { path: 'nuevo', component: CreaeditacanjeComponent },// Ruta para crear/editar un canje
            {
                path:'ediciones/:id',component:CreaeditacanjeComponent
            }]
    },
    {
        path: 'curso', component: CursoComponent, // Ruta para listar los canjes
        children: [
            { path: 'nuevo', component: CreaeditacursoComponent },
            { path: 'cuestionario-academico', component: CuestionarioacademicoComponent }
        ]
    },
    {
        path: 'asociado', component:AsociadoComponent, // Ruta para listar los asociados
    },
    {
        path: 'recompensas', component:RecompensaComponent, // Ruta para listar las recompensas
    },
    {
        path: '', component:PagemainComponent, // Ruta para listar los asociados
    },
    {
        path: 'cursoadmin', component:ListarCursoadminComponent, // Ruta para listar los asociados
    }
]
;

