import { Component, OnInit, } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pregunta } from '../../../models/Pregunta';
import { PreguntaService } from '../../../services/pregunta.service';
import { CuestionarioAcademicoService } from '../../../services/cuestionario-academico.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-pregunta',
  standalone: true,
  imports: [MatTableModule, CommonModule, RouterModule],
  templateUrl: './listar-pregunta.component.html',
  styleUrl: './listar-pregunta.component.css'
})
export class ListarPreguntaComponent implements OnInit{
  identpregunta:number=0
  role: string = '';
  dataSource:MatTableDataSource<Pregunta>=new MatTableDataSource()

  constructor(private ls: LoginService, private pS:PreguntaService, private caS:CuestionarioAcademicoService){}

  ngOnInit(): void {
    // Llama al servicio y asigna los datos al dataSource
    this.pS.list().subscribe((data)=>{
      // Filtra los datos solo para el cuestionario actual
      const filteredData = data.filter((element: Pregunta) => element.cuestionario.id_cuestionario === this.caS.getIdcuestionario());
      this.dataSource=new MatTableDataSource(filteredData)
    });
  }
  setIdpregunta(value: number) {
    this.identpregunta = value;
    this.pS.setIdpregunta(value);
  }
  isclient() {
    this.role = this.ls.showRole();
    return this.role === 'CLIENT';
  }
  comenzarPregunta(preguntaId: number): void {
    // Establece el ID de la pregunta en el servicio y navega al componente de resolución
    this.pS.setIdpregunta(preguntaId);
  }
}
