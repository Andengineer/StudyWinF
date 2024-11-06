import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Curso } from '../../../models/Curso';
import { CursoService } from '../../../services/curso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-cursoadmin',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatPaginatorModule],
  templateUrl: './listar-cursoadmin.component.html',
  styleUrl: './listar-cursoadmin.component.css'
})
export class ListarCursoadminComponent implements OnInit{
  dataSource:MatTableDataSource<Curso>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','accion01','accion02']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private cS:CursoService, private snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.cS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    });
    this.cS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
}

eliminar(id: number): void {
  this.cS.delete(id).subscribe(
    () => {
      // Recargar la lista después de eliminar
      this.cS.list().subscribe(data => {
        this.cS.setList(data);
        this.snackBar.open('Elemento eliminado correctamente.', 'Cerrar', {
          duration: 3000,
        });
      });
    },
    error => {
      // Manejar el error de clave foránea
      if (error.status === 409) { // Ajusta el código de error si es necesario
        this.snackBar.open('Elimine el dato foráneo antes de eliminar este registro.', 'Cerrar', {
          duration: 5000,
        });
      } else {
        this.snackBar.open('Existe un elemento foraneo que depende de este, eliminelo antes de eliminar este', 'Cerrar', {
          duration: 3000,
        });
      }
    }
  );
}
ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  
}
}
