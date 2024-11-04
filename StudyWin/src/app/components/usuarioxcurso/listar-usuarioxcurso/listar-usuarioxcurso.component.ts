import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { UsuarioXCurso } from '../../../models/UsuarioXCurso';
import { UsuarioXCursoService } from '../../../services/usuario-xcurso.service';

@Component({
  selector: 'app-listar-usuarioxcurso',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: './listar-usuarioxcurso.component.html',
  styleUrl: './listar-usuarioxcurso.component.css'
})
export class ListarUsuarioxcursoComponent {
  dataSource:MatTableDataSource<UsuarioXCurso>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','eliminar','actualizar']
  constructor(private uS:UsuarioXCursoService){}
  ngOnInit(): void {
      this.uS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      });
      this.uS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
      });
  }
  eliminar(id:number){
    this.uS.delete(id).subscribe(data=>{
      this.uS.list().subscribe(data=>{
        this.uS.setList(data)
      })
    })
  }
}
