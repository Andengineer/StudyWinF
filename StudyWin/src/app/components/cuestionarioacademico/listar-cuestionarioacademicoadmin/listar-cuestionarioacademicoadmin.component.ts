import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Cuestionario_academico } from '../../../models/Cuestionario_academico';
import { CuestionarioAcademicoService } from '../../../services/cuestionario-academico.service';

@Component({
  selector: 'app-listar-cuestionarioacademicoadmin',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatPaginatorModule],
  templateUrl: './listar-cuestionarioacademicoadmin.component.html',
  styleUrl: './listar-cuestionarioacademicoadmin.component.css'
})
export class ListarCuestionarioacademicoadminComponent {
  dataSource:MatTableDataSource<Cuestionario_academico>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','accion01','accion02']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private caS:CuestionarioAcademicoService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.caS.list().subscribe(data=>{
      console.log("Datos recibidos:", data); // Verifica la estructura aquí
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    });
    this.caS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
}

eliminar(id: number): void {
  this.caS.delete(id).subscribe(
    () => {
      // Recargar la lista después de eliminar
      this.caS.list().subscribe(data => {
        this.caS.setList(data);
        this.snackBar.open('Cuestionario académico eliminado correctamente.', 'Cerrar', {
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
