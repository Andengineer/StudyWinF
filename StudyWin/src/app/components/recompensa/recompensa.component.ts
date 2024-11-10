import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarRecompensaadminComponent } from "./listar-recompensaadmin/listar-recompensaadmin.component";

@Component({
  selector: 'app-recompensa',
  standalone: true,
  imports: [RouterOutlet, ListarRecompensaadminComponent],
  templateUrl: './recompensa.component.html',
  styleUrl: './recompensa.component.css'
})
export class RecompensaComponent {
  constructor(public route:ActivatedRoute){}
}
