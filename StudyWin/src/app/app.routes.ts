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
import { ListarCursoComponent } from './components/curso/listar-curso/listar-curso.component';
import { UsuarioxcursoComponent } from './components/usuarioxcurso/usuarioxcurso.component';
import { CreaeditausuarioxcursoComponent } from './components/usuarioxcurso/creaeditausuarioxcurso/creaeditausuarioxcurso.component';
import { DetallexcanjeComponent } from './components/detallexcanje/detallexcanje.component';
import { CreaeditaDetallexcanjeComponent } from './components/detallexcanje/creaedita-detallexcanje/creaedita-detallexcanje.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { LoginComponent } from './components/login/login.component';
import { ListarcanjeclientComponent } from './components/canje/listarcanjeclient/listarcanjeclient.component';
import { ListardetallecanjeclientComponent } from './components/detallexcanje/listardetallecanjeclient/listardetallecanjeclient.component';
import { ListarusuarioxcursoclientComponent } from './components/usuarioxcurso/listarusuarioxcursoclient/listarusuarioxcursoclient.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    //Developer
    {
        path: 'canje', component: CanjeComponent, // Ruta para listar los canjes
        children: [
            { path: 'nuevo', component: CreaeditacanjeComponent },// Ruta para crear/editar un canje
            {
                path: 'ediciones/:id', component: CreaeditacanjeComponent
            }]
    },
    {
        path: 'cursoadmin', component: CursoComponent,
        children: [
            { path: 'ediciones/:id', component: CreaeditacursoComponent },// Ruta para listar los cursos vista admin
            { path: 'nuevo', component: CreaeditacursoComponent }
        ]
    },
    {
        path: 'usuarioxcurso', component: UsuarioxcursoComponent,
        children: [{
            path: 'nuevo', component: CreaeditausuarioxcursoComponent
        },
        {
            path: 'ediciones/:id', component: CreaeditausuarioxcursoComponent
        },
        {
            path: 'miscursos', component: ListarusuarioxcursoclientComponent
        },]
    },
    {
        path: 'detalle-canje', component: DetallexcanjeComponent,
        children: [{
            path: 'nuevo', component: CreaeditaDetallexcanjeComponent
        },
        {
            path: 'ediciones/:id', component: CreaeditaDetallexcanjeComponent
        },
        {
            path: ':id', component: ListardetallecanjeclientComponent
        },]
    },
    //Cliente
    {
        path: 'canje-client', component: ListarcanjeclientComponent,
        
    },
    {
        path: 'usuario', component: UsuarioComponent,
        children: [{
            path: 'nuevo', component: CreaeditausuarioComponent
        },
        {
            path: 'ediciones/:id', component: CreaeditausuarioComponent
        }]
    },
    {
        path: 'curso', component: ListarCursoComponent,
        

    },
    //ordenar
    {
        path: 'asociado', component: AsociadoComponent, // Ruta para listar los asociados
    },
    {
        path: 'recompensas', component: RecompensaComponent, // Ruta para listar las recompensas
    },
    {
        path: 'cuestionario', component: CuestionarioacademicoComponent, // Ruta para listar los cuestionarios
    },
    {
        path: 'pregunta', component: PreguntaComponent, // Ruta para listar las preguntas
    },
    //main
    {
        path: 'home', component: PagemainComponent, // Ruta para listar el mainpage
    }
]
    ;

