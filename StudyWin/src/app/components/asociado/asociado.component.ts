import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarAsociadoComponent } from "./listar-asociado/listar-asociado.component";
import { ListarAsociadoadminComponent } from './listar-asociadoadmin/listar-asociadoadmin.component';

@Component({
  selector: 'app-asociado',
  standalone: true,
  imports: [ListarAsociadoComponent,RouterOutlet,ListarAsociadoadminComponent],
  templateUrl: './asociado.component.html',
  styleUrl: './asociado.component.css'
})
export class AsociadoComponent {
  constructor(public route:ActivatedRoute){}
}
