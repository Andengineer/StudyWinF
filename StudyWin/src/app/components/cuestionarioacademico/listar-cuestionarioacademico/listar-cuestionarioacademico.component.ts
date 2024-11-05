import { Component } from '@angular/core';
import { Cuestionario_academico } from '../../../models/Cuestionario_academico';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { CuestionarioAcademicoService } from '../../../services/cuestionario-academico.service';

@Component({
  selector: 'app-listar-cuestionarioacademico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-cuestionarioacademico.component.html',
  styleUrl: './listar-cuestionarioacademico.component.css'
})
export class ListarCuestionarioacademicoComponent {
  dataSource:MatTableDataSource<Cuestionario_academico>=new MatTableDataSource()

  constructor(private caS:CuestionarioAcademicoService){}
  ngOnInit(): void {
    this.caS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    });
  }
}
