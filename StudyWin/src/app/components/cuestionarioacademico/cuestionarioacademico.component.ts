import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarCuestionarioacademicoComponent } from './listar-cuestionarioacademico/listar-cuestionarioacademico.component';

@Component({
  selector: 'app-cuestionarioacademico',
  standalone: true,
  imports: [ListarCuestionarioacademicoComponent,RouterOutlet],
  templateUrl: './cuestionarioacademico.component.html',
  styleUrl: './cuestionarioacademico.component.css'
})
export class CuestionarioacademicoComponent {
  constructor(public route:ActivatedRoute){}
}
