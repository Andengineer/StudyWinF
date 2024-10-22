import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarCanjeComponent } from './listar-canje/listar-canje.component';

@Component({
  selector: 'app-canje',
  standalone: true,
  imports: [ListarCanjeComponent,RouterOutlet],
  templateUrl: './canje.component.html',
  styleUrl: './canje.component.css'
})
export class CanjeComponent {
  constructor(public route:ActivatedRoute){}
}
 