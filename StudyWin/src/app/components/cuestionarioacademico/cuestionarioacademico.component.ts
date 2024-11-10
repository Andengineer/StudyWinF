import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarCuestionarioacademicoadminComponent } from "./listar-cuestionarioacademicoadmin/listar-cuestionarioacademicoadmin.component";

@Component({
  selector: 'app-cuestionarioacademico',
  standalone: true,
  imports: [RouterOutlet, ListarCuestionarioacademicoadminComponent],
  templateUrl: './cuestionarioacademico.component.html',
  styleUrl: './cuestionarioacademico.component.css'
})
export class CuestionarioacademicoComponent {
  constructor(public route:ActivatedRoute){}
}
