import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Recompensa } from '../../../models/Recompensa';
import { RecompensaService } from '../../../services/recompensa.service';

@Component({
  selector: 'app-listar-recompensaadmin',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatPaginatorModule],
  templateUrl: './listar-recompensaadmin.component.html',
  styleUrl: './listar-recompensaadmin.component.css'
})
export class ListarRecompensaadminComponent {
  dataSource:MatTableDataSource<Recompensa>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','c8','accion01','accion02']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private rS:RecompensaService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.rS.list().subscribe(data=>{
      console.log("Datos recibidos:", data); // Verifica la estructura aquí
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    });
    this.rS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
}

eliminar(id: number): void {
  this.rS.delete(id).subscribe(
    () => {
      // Recargar la lista después de eliminar
      this.rS.list().subscribe(data => {
        this.rS.setList(data);
        this.snackBar.open('Recompensa eliminada correctamente.', 'Cerrar', {
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
