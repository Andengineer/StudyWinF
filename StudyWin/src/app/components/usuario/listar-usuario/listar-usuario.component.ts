import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-listar-usuario',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.css'
})
export class ListarUsuarioComponent implements OnInit{
  dataSource:MatTableDataSource<Usuario>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c7','c8','eliminar','actualizar']

  constructor(private uS:UsuarioService,private snackBar: MatSnackBar){}
  ngOnInit(): void {
      this.uS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      });
      this.uS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
      });
  }
  eliminar(id: number): void {
    this.uS.delete(id).subscribe(
      () => {
        // Recargar la lista después de eliminar
        this.uS.list().subscribe(data => {
          this.uS.setList(data);
          this.snackBar.open('Elemento eliminado correctamente.', 'Cerrar', {
            duration: 3000,
          });
        });
      },
      error => {
        // Manejar el error de clave foránea
        if (error.status === 409) { // Ajusta el código de error si es necesario
          this.snackBar.open('Existen tablas que dependen de esta, eliminelas antes de eliminar esta', 'Cerrar', {
            duration: 5000,
          });
        } else {
          this.snackBar.open('Existen tablas que dependen de esta, eliminelas antes de eliminar esta', 'Cerrar', {
            duration: 3000,
          });
        }
      }
    );
  }
}
