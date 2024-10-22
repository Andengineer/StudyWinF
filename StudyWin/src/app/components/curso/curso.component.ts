import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarCursoComponent } from './listar-curso/listar-curso.component';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [ListarCursoComponent,RouterOutlet],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent {
  constructor(public route:ActivatedRoute){}
}
