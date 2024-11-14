import { Component } from '@angular/core';
import { CantidadporIEComponent } from "./cantidadpor-ie/cantidadpor-ie.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CantidadporIEComponent,RouterOutlet],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute) {}
}
