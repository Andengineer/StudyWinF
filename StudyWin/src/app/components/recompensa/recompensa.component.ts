import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarRecompensaComponent } from "./listar-recompensa/listar-recompensa.component";
import { ListarRecompensaadminComponent } from "./listar-recompensaadmin/listar-recompensaadmin.component";

@Component({
  selector: 'app-recompensa',
  standalone: true,
  imports: [ListarRecompensaComponent, RouterOutlet, ListarRecompensaadminComponent],
  templateUrl: './recompensa.component.html',
  styleUrl: './recompensa.component.css'
})
export class RecompensaComponent {
  constructor(public route:ActivatedRoute){}
}
