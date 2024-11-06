import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { UsuarioXCurso } from '../../../models/UsuarioXCurso';
import { UsuarioXCursoService } from '../../../services/usuario-xcurso.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-usuarioxcurso',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatPaginatorModule],
  templateUrl: './listar-usuarioxcurso.component.html',
  styleUrl: './listar-usuarioxcurso.component.css'
})
export class ListarUsuarioxcursoComponent {
  dataSource:MatTableDataSource<UsuarioXCurso>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','eliminar','actualizar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private uS:UsuarioXCursoService){}
  ngOnInit(): void {
      this.uS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator;
      });
      this.uS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }
  eliminar(id:number){
    this.uS.delete(id).subscribe(data=>{
      this.uS.list().subscribe(data=>{
        this.uS.setList(data)
        this.dataSource.paginator = this.paginator;
      })
    })
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    
  }
}
