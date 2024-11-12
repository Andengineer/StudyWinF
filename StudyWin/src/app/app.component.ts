import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CursoComponent } from "./components/curso/curso.component";
import { CanjeComponent } from "./components/canje/canje.component";
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AsociadoComponent } from './components/asociado/asociado.component';
import { RecompensaComponent } from './components/recompensa/recompensa.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { CuestionarioacademicoComponent } from './components/cuestionarioacademico/cuestionarioacademico.component';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';
import { AsociadoService } from './services/asociado.service';
import { RecompensaService } from './services/recompensa.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, AsociadoComponent, UsuarioComponent, CursoComponent, CanjeComponent,MatToolbarModule,MatIconModule,MatMenuModule,MatButtonModule,RouterModule,RecompensaComponent,PreguntaComponent,CuestionarioacademicoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StudyWin';
  role: string = '';
  nombre: string='';
  constructor(private loginService: LoginService, private aS:AsociadoService, private rS:RecompensaService) {}

  ngOnInit() {
    this.verificar();
    this.shownombre(); // Llamamos a shownombre para cargar el nombre de usuario
  }

  cerrar() {
    sessionStorage.clear();
  }
  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isDeveloper() {
    return this.role === 'DEVELOPER';
  }

  isclient() {
    return this.role === 'CLIENT';
  }

  isStudent() {
    return this.role === 'STUDENT';
  }

  setBolean(){
    this.rS.setBolean(false)
  }

  shownombre(){
    this.nombre=this.loginService.showUser();
    console.log("Usuario:", this.nombre);
  }
}
