import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarPreguntaComponent } from "./listar-pregunta/listar-pregunta.component";
import { ListarPreguntaadminComponent } from "./listar-preguntaadmin/listar-preguntaadmin.component";

@Component({
  selector: 'app-pregunta',
  standalone: true,
  imports: [RouterOutlet, ListarPreguntaadminComponent],
  templateUrl: './pregunta.component.html',
  styleUrl: './pregunta.component.css'
})
export class PreguntaComponent {
  constructor(public route:ActivatedRoute){}

}
