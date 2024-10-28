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


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsociadoComponent, UsuarioComponent, CursoComponent, CanjeComponent,MatToolbarModule,MatIconModule,MatMenuModule,MatButtonModule,RouterModule,RecompensaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StudyWin';
}
