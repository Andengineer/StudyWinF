import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Asociado } from '../../../models/Asociado';
import { AsociadoService } from '../../../services/asociado.service';

@Component({
  selector: 'app-listar-asociadoadmin',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatPaginatorModule],
  templateUrl: './listar-asociadoadmin.component.html',
  styleUrl: './listar-asociadoadmin.component.css'
})
export class ListarAsociadoadminComponent {
  dataSource:MatTableDataSource<Asociado>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','accion01','accion02']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private aS:AsociadoService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.aS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    });
    this.aS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
}

eliminar(id: number): void {
  this.aS.delete(id).subscribe(
    () => {
      // Recargar la lista después de eliminar
      this.aS.list().subscribe(data => {
        this.aS.setList(data);
        this.snackBar.open('Asociado eliminado correctamente.', 'Cerrar', {
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
