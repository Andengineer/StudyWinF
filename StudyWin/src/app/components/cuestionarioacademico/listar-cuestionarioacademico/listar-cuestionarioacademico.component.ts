import { Component } from '@angular/core';
import { Cuestionario_academico } from '../../../models/Cuestionario_academico';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { CuestionarioAcademicoService } from '../../../services/cuestionario-academico.service';
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-listar-cuestionarioacademico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-cuestionarioacademico.component.html',
  styleUrl: './listar-cuestionarioacademico.component.css'
})
export class ListarCuestionarioacademicoComponent {
  dataSource:MatTableDataSource<Cuestionario_academico>=new MatTableDataSource()

  constructor(private caS:CuestionarioAcademicoService, private cS:CursoService){}
  ngOnInit(): void {
       // Llama al servicio y asigna los datos al dataSource
    this.caS.list().subscribe((data)=>{
      // Filtra los datos solo para el usuario actual
      const filteredData = data.filter((element: Cuestionario_academico) => element.curso.id_curso === this.cS.getIdcurso());
      this.dataSource = new MatTableDataSource(filteredData);
    });
  }
}
