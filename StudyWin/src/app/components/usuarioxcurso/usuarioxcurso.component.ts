import { Component } from '@angular/core';
import { ListarUsuarioxcursoComponent } from "./listar-usuarioxcurso/listar-usuarioxcurso.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usuarioxcurso',
  standalone: true,
  imports: [ListarUsuarioxcursoComponent,RouterOutlet],
  templateUrl: './usuarioxcurso.component.html',
  styleUrl: './usuarioxcurso.component.css'
})
export class UsuarioxcursoComponent {
  constructor(public route:ActivatedRoute){}
}
