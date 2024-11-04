import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Canje } from '../../../models/Canje';
import { CanjeService } from '../../../services/canje.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-listar-canje',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: './listar-canje.component.html',
  styleUrl: './listar-canje.component.css'
})
export class ListarCanjeComponent implements OnInit {
  dataSource:MatTableDataSource<Canje>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','eliminar','actualizar']

  constructor(private cS:CanjeService,private snackBar: MatSnackBar){}
  ngOnInit(): void {
      this.cS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      });
      this.cS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
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
          this.snackBar.open('Elimine el elemento foraneo de Usuario', 'Cerrar', {
            duration: 3000,
          });
        }
      }
    );
  }
}
