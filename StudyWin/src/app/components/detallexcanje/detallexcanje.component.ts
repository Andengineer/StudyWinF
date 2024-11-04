import { Component } from '@angular/core';
import { ListarDetallexcanjeComponent } from "./listar-detallexcanje/listar-detallexcanje.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-detallexcanje',
  standalone: true,
  imports: [ListarDetallexcanjeComponent,RouterOutlet],
  templateUrl: './detallexcanje.component.html',
  styleUrl: './detallexcanje.component.css'
})
export class DetallexcanjeComponent {
  constructor(public route:ActivatedRoute){}
}
