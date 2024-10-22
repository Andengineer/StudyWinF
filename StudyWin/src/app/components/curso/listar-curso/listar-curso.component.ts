import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Curso } from '../../../models/Curso';
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-listar-curso',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listar-curso.component.html',
  styleUrl: './listar-curso.component.css'
})
export class ListarCursoComponent {
  dataSource:MatTableDataSource<Curso>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4']

  constructor(private cS:CursoService){}
  ngOnInit(): void {
      this.cS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      });
  }
}
