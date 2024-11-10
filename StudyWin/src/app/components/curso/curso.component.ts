import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarCursoadminComponent } from "./listar-cursoadmin/listar-cursoadmin.component";

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [RouterOutlet, ListarCursoadminComponent],
  templateUrl: './curso.component.html',
  styleUrl: './curso.component.css'
})
export class CursoComponent {
  constructor(public route:ActivatedRoute){}
}
