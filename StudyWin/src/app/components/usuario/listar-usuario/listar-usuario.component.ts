import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';



@Component({
  selector: 'app-listar-usuario',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatPaginatorModule],
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.css'
})
export class ListarUsuarioComponent implements OnInit,AfterViewInit{
  dataSource:MatTableDataSource<Usuario>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c7','c8','eliminar','actualizar']

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private uS:UsuarioService,private snackBar: MatSnackBar){}
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
  eliminar(id: number): void {
    this.uS.delete(id).subscribe(
      () => {
        // Recargar la lista después de eliminar
        this.uS.list().subscribe(data => {
          this.uS.setList(data);
          this.dataSource.paginator = this.paginator;
          this.snackBar.open('Elemento eliminado correctamente.', 'Cerrar', {
            duration: 3000,
          });
        });
      },
      error => {
        // Manejar el error de clave foránea
        if (error.status === 409) { 
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
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    
  }
}
