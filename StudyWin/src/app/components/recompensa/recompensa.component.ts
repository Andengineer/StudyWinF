import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarRecompensaComponent } from "./listar-recompensa/listar-recompensa.component";

@Component({
  selector: 'app-recompensa',
  standalone: true,
  imports: [ListarRecompensaComponent,RouterOutlet],
  templateUrl: './recompensa.component.html',
  styleUrl: './recompensa.component.css'
})
export class RecompensaComponent {
  constructor(public route:ActivatedRoute){}
}
