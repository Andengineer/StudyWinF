import { Component } from '@angular/core';
import { ListarTipoDeRecompensaComponent } from './listar-tipo-de-recompensa/listar-tipo-de-recompensa.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tipo-de-recompensa',
  standalone: true,
  imports: [ListarTipoDeRecompensaComponent,RouterOutlet],
  templateUrl: './tipo-de-recompensa.component.html',
  styleUrl: './tipo-de-recompensa.component.css'
})
export class TipoDeRecompensaComponent {
  constructor(public route:ActivatedRoute){}
}
