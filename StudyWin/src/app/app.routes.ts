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
import { ListarCursoComponent } from './components/curso/listar-curso/listar-curso.component';
import { UsuarioxcursoComponent } from './components/usuarioxcurso/usuarioxcurso.component';
import { CreaeditausuarioxcursoComponent } from './components/usuarioxcurso/creaeditausuarioxcurso/creaeditausuarioxcurso.component';
import { DetallexcanjeComponent } from './components/detallexcanje/detallexcanje.component';
import { CreaeditaDetallexcanjeComponent } from './components/detallexcanje/creaedita-detallexcanje/creaedita-detallexcanje.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';

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
        path: 'curso', component: ListarCursoComponent
        
    },
    {
        path: 'asociado', component:AsociadoComponent, // Ruta para listar los asociados
    },
    {
        path: 'recompensas', component:RecompensaComponent, // Ruta para listar las recompensas
    },
    {
        path: 'cuestionario', component:CuestionarioacademicoComponent, // Ruta para listar los cuestionarios
    },
    {
        path: 'pregunta', component:PreguntaComponent, // Ruta para listar las preguntas
    },
    {
        path: '', component:PagemainComponent, // Ruta para listar el mainpage
    },
    {
        path: 'cursoadmin', component:CursoComponent,
        children:[
            {path:'ediciones/:id',component:CreaeditacursoComponent},// Ruta para listar los cursos vista admin
            {path: 'nuevo', component: CreaeditacursoComponent }
        ] 
    },
    {
        path: 'usuarioxcurso',component:UsuarioxcursoComponent,
        children:[{
            path:'nuevo',component:CreaeditausuarioxcursoComponent},
        {
            path:'ediciones/:id',component:CreaeditausuarioxcursoComponent
        }]
    },
    {
        path: 'detalle-canje',component:DetallexcanjeComponent,
        children:[{
            path:'nuevo',component:CreaeditaDetallexcanjeComponent},
        {
            path:'ediciones/:id',component:CreaeditaDetallexcanjeComponent
        }]
    }
]
;

