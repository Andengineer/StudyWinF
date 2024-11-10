import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TipoRecompensa } from '../../../models/TipoRecompensa';
import { TipoDeRecompensaService } from '../../../services/tipo-de-recompensa.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-listar-tipo-de-recompensa',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatPaginatorModule],
  templateUrl: './listar-tipo-de-recompensa.component.html',
  styleUrl: './listar-tipo-de-recompensa.component.css'
})
export class ListarTipoDeRecompensaComponent implements OnInit{
  dataSource:MatTableDataSource<TipoRecompensa>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','accion01','accion02']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private trS:TipoDeRecompensaService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.trS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      console.log(DataSource)
    });
    this.trS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      console.log(DataSource)
    });
}

eliminar(id: number): void {
  this.trS.delete(id).subscribe(
    () => {
      // Recargar la lista después de eliminar
      this.trS.list().subscribe(data => {
        this.trS.setList(data);
        this.snackBar.open('Tipo de recompensa eliminado correctamente.', 'Cerrar', {
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
