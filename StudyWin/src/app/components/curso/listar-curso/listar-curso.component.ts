import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Curso } from '../../../models/Curso';
import { CursoService } from '../../../services/curso.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-curso',
  standalone: true,
  imports: [MatTableModule,CommonModule],
  templateUrl: './listar-curso.component.html',
  styleUrl: './listar-curso.component.css'
})
export class ListarCursoComponent implements OnInit{
  dataSource:MatTableDataSource<Curso>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4']

  constructor(private cS:CursoService){}
  ngOnInit(): void {
      this.cS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      });
      this.cS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
      });
  }
}
