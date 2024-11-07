import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [ListarUsuarioComponent,RouterOutlet],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  constructor(public route:ActivatedRoute){}
  
}
