import { Component } from '@angular/core';
import { Cuestionario_academico } from '../../../models/Cuestionario_academico';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { CuestionarioAcademicoService } from '../../../services/cuestionario-academico.service';
import { CursoService } from '../../../services/curso.service';
import { LoginService } from '../../../services/login.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-cuestionarioacademico',
  standalone: true,
  imports: [MatTableModule, CommonModule,RouterModule],
  templateUrl: './listar-cuestionarioacademico.component.html',
  styleUrl: './listar-cuestionarioacademico.component.css'
})
export class ListarCuestionarioacademicoComponent {
  dataSource:MatTableDataSource<Cuestionario_academico>=new MatTableDataSource()
  role: string = '';
  identcuestionario:number=0

  constructor(private ls: LoginService, private caS:CuestionarioAcademicoService, private cS:CursoService){}
  ngOnInit(): void {
       // Llama al servicio y asigna los datos al dataSource
    this.caS.list().subscribe((data)=>{
      // Filtra los datos solo para el usuario actual
      const filteredData = data.filter((element: Cuestionario_academico) => element.curso.id_curso === this.cS.getIdcurso());
      this.dataSource = new MatTableDataSource(filteredData);
    });
  }
  isclient() {
    this.role = this.ls.showRole();
    return this.role === 'CLIENT';
  }
  setIdcuestionario(value: number) {
    this.identcuestionario = value;
    this.caS.setIdcuestionario(value);
  }
}
