import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListarCursoComponent } from "../../curso/listar-curso/listar-curso.component";
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-pagemain',
  standalone: true,
  imports: [ListarCursoComponent],
  templateUrl: './pagemain.component.html',
  styleUrl: './pagemain.component.css'
})
export class PagemainComponent implements OnDestroy {
  constructor(private cS:CursoService){}
  ngOnInit() {
    this.cS.settitle(false); // Oculta el título al cargar
  }
  ngOnDestroy() {
    this.cS.settitle(true); // Restaura la visibilidad del título al salir
  }
  settitle() {
    this.cS.settitle(false);
  }
}
