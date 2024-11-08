import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Curso } from '../../../models/Curso';
import { CursoService } from '../../../services/curso.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { UsuarioXCursoService } from '../../../services/usuario-xcurso.service';
import { UsuarioXCurso } from '../../../models/UsuarioXCurso';


@Component({
  selector: 'app-listar-curso',
  standalone: true,
  imports: [MatTableModule,CommonModule],
  templateUrl: './listar-curso.component.html',
  styleUrl: './listar-curso.component.css'
})
export class ListarCursoComponent implements OnInit{
  dataSource:MatTableDataSource<Curso>= new MatTableDataSource();
  usXcurso:UsuarioXCurso=new UsuarioXCurso()
  
  constructor(private cS:CursoService, private ls:LoginService, private uxcS:UsuarioXCursoService){}
  Comenzar(idcurso:number){
    this.usXcurso.curso.id_curso=idcurso
    this.usXcurso.usuario.id_usuario=this.ls.getId()
    this.uxcS.insert(this.usXcurso).subscribe(d=>{})
  }
  ngOnInit(): void {
      this.cS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      });
      this.cS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
      });
  }
}
