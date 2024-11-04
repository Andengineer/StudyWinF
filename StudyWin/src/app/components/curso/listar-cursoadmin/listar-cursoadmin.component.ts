import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Curso } from '../../../models/Curso';
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-listar-cursoadmin',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: './listar-cursoadmin.component.html',
  styleUrl: './listar-cursoadmin.component.css'
})
export class ListarCursoadminComponent implements OnInit{
  dataSource:MatTableDataSource<Curso>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','accion01','accion02']
  constructor(private cS:CursoService){}
  ngOnInit(): void {
    this.cS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    });
    this.cS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    });
}

eliminar(id:number){
  this.cS.delete(id).subscribe(data=>{
    this.cS.list().subscribe(data=>{
      this.cS.setList(data)
    })
  })
}
}
