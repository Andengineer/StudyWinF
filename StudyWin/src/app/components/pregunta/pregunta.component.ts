import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarPreguntaComponent } from "./listar-pregunta/listar-pregunta.component";

@Component({
  selector: 'app-pregunta',
  standalone: true,
  imports: [ListarPreguntaComponent,RouterOutlet],
  templateUrl: './pregunta.component.html',
  styleUrl: './pregunta.component.css'
})
export class PreguntaComponent {
  constructor(public route:ActivatedRoute){}

}
