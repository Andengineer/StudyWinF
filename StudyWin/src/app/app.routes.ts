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
import { RegistrarrolComponent } from './components/rol/registrarrol/registrarrol.component';
import { UserprofileComponent } from './components/usuario/userprofile/userprofile.component';
import { CreaeditaasociadoComponent } from './components/asociado/creaeditaasociado/creaeditaasociado.component';
import { ListarAsociadoComponent } from './components/asociado/listar-asociado/listar-asociado.component';
import { TipoDeRecompensaComponent } from './components/tipo-de-recompensa/tipo-de-recompensa.component';
import { CreaeditatiporecompensaComponent } from './components/tipo-de-recompensa/creaeditatiporecompensa/creaeditatiporecompensa.component';
import { CreaeditarecompensaComponent } from './components/recompensa/creaeditarecompensa/creaeditarecompensa.component';
import { ListarRecompensaComponent } from './components/recompensa/listar-recompensa/listar-recompensa.component';
import { ListarCuestionarioacademicoComponent } from './components/cuestionarioacademico/listar-cuestionarioacademico/listar-cuestionarioacademico.component';
import { CreaeditacuestionarioacademicoComponent } from './components/cuestionarioacademico/creaeditacuestionarioacademico/creaeditacuestionarioacademico.component';
import { ListarPreguntaComponent } from './components/pregunta/listar-pregunta/listar-pregunta.component';
import { CreaeditapreguntaComponent } from './components/pregunta/creaeditapregunta/creaeditapregunta.component';
import { ResolucionpreguntaClientComponent } from './components/pregunta/resolucionpregunta-client/resolucionpregunta-client.component';
import { CantidadporIEComponent } from './components/reportes/cantidadpor-ie/cantidadpor-ie.component';
import { CantidadporCategoriaComponent } from './components/reportes/cantidadpor-categoria/cantidadpor-categoria.component';
import { PageComponent } from './components/landing/page/page.component';
import { RecompensaspopularesComponent } from './components/reportes/recompensaspopulares/recompensaspopulares.component';
import { UsuariosporCuestionariosComponent } from './components/reportes/usuariospor-cuestionarios/usuariospor-cuestionarios.component';

export const routes: Routes = [
    //Login
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'profile',
        component: UserprofileComponent,
        canActivate: [seguridadGuard],
    },

    //Developer
    {
        path: 'canje', component: CanjeComponent, // Ruta para listar los canjes
        children: [
            { path: 'nuevo', component: CreaeditacanjeComponent },// Ruta para crear/editar un canje
            {
                path: 'ediciones/:id', component: CreaeditacanjeComponent
            }],
            canActivate: [seguridadGuard],
    },
    {
        path: 'cursoadmin', component: CursoComponent,
        children: [
            { path: 'ediciones/:id', component: CreaeditacursoComponent },// Ruta para listar los cursos vista admin
            { path: 'nuevo', component: CreaeditacursoComponent }
        ],
        canActivate: [seguridadGuard],
    },
    {
        path: 'asociadoadmin', component: AsociadoComponent,// Ruta para listar los asociados vista admin
        children: [
            { path: 'ediciones/:id', component: CreaeditaasociadoComponent },// Ruta para editar/eliminar un asociado
            { path: 'nuevo', component: CreaeditaasociadoComponent }// Ruta para registrar un asociado
        ],
        canActivate:[seguridadGuard],
    },
    {
        path: 'tiporecompensaadmin', component: TipoDeRecompensaComponent,// Ruta para listar los tipos de recompensas vista admin
        children: [
            { path: 'ediciones/:id', component: CreaeditatiporecompensaComponent },// Ruta para editar/eliminar un tipo de recompensa
            { path: 'nuevo', component: CreaeditatiporecompensaComponent }// Ruta para registrar un tipo de recompensa
        ],
        canActivate:[seguridadGuard],
    },
    {
        path: 'recompensaadmin', component: RecompensaComponent,// Ruta para listar las recompensas vista admin
        children: [
            { path: 'ediciones/:id', component: CreaeditarecompensaComponent },// Ruta para editar/eliminar una recompensa
            { path: 'nuevo', component: CreaeditarecompensaComponent }// Ruta para registrar una recompensa
        ],
        canActivate:[seguridadGuard],
    },
    {
        path: 'cuestionarioacademicoadmin', component: CuestionarioacademicoComponent,// Ruta para listar los cuestionarios academicos vista admin
        children: [
            { path: 'ediciones/:id', component: CreaeditacuestionarioacademicoComponent },// Ruta para editar/eliminar un cuestionario academico
            { path: 'nuevo', component: CreaeditacuestionarioacademicoComponent }// Ruta para registrar un cuestionario academico
        ],
        canActivate:[seguridadGuard],
    },
    {
        path: 'preguntaadmin', component: PreguntaComponent,// Ruta para listar las preguntas vista admin
        children: [
            { path: 'ediciones/:id', component: CreaeditapreguntaComponent },// Ruta para editar/eliminar una pregunta
            { path: 'nuevo', component: CreaeditapreguntaComponent }// Ruta para registrar una pregunta
        ],
        canActivate:[seguridadGuard],
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
        },],
        canActivate: [seguridadGuard],
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
            path: 'cl', component: ListardetallecanjeclientComponent
        },],
        canActivate: [seguridadGuard],
    },
    {
        path: 'rol', component: RegistrarrolComponent,
        canActivate: [seguridadGuard],
    },

    //Cliente
    {
        path: 'canje-client', component: ListarcanjeclientComponent,
        canActivate: [seguridadGuard],
    },
    {
        path: 'usuario', component: UsuarioComponent,
        children: [{
            path: 'nuevo', component: CreaeditausuarioComponent
        },
        {
            path: 'ediciones/:id', component: CreaeditausuarioComponent
            
        }],
        
    },
    {
        path: 'curso', component: ListarCursoComponent, // Ruta para listar los cursos del cliente como cards
        canActivate: [seguridadGuard],
    },
    {
        path: 'asociado', component: ListarAsociadoComponent, // Ruta para listar los asociados como cards
        canActivate: [seguridadGuard],
    },
    {
        path: 'recompensa', component: ListarRecompensaComponent, // Ruta para listar las recompensas para cada asociado
        canActivate: [seguridadGuard],
    },
    {
        path: 'recompensas', component: ListarRecompensaComponent, // Ruta para listar las recompensas totales
        canActivate: [seguridadGuard],
    },
    {
        path: 'cuestionario', component: ListarCuestionarioacademicoComponent, // Ruta para listar los cuestionarios como cards
        canActivate: [seguridadGuard],
    },
    {
        path: 'pregunta', component: ListarPreguntaComponent, // Ruta para listar las preguntas como lista ordenada
        canActivate: [seguridadGuard],
    },
    {
        path: 'resolucion', component: ResolucionpreguntaClientComponent, // Ruta para listar los cuestionarios como cards
        canActivate: [seguridadGuard],
    },
    //main
    {
        path: 'home', component: PagemainComponent, // Ruta para listar el mainpage
        canActivate: [seguridadGuard],
    },
    //reportes
    {
        path: 'cantuserxIE', component: CantidadporIEComponent,
        canActivate: [seguridadGuard],
    },
    {
        path: 'cantcursosxCat', component: CantidadporCategoriaComponent,
        canActivate: [seguridadGuard],
    },
    {
        path: 'recompensaspopulares', component: RecompensaspopularesComponent,
        canActivate: [seguridadGuard],
    },
    {
        path: 'cuestionariosresueltos', component: UsuariosporCuestionariosComponent,
        canActivate: [seguridadGuard],
    },
    //landing
    {
        path: 'landing',component: PageComponent
    }
]
    ;

