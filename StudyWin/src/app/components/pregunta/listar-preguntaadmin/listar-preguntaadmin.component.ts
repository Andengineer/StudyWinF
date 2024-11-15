import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pregunta } from '../../../models/Pregunta';
import { PreguntaService } from '../../../services/pregunta.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-preguntaadmin',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,CommonModule],
  templateUrl: './listar-preguntaadmin.component.html',
  styleUrl: './listar-preguntaadmin.component.css'
})
export class ListarPreguntaadminComponent implements OnInit{
  dataSource:MatTableDataSource<Pregunta>= new MatTableDataSource()
  constructor(private pS:PreguntaService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.pS.list().subscribe(data=>{
      console.log("Datos recibidos:", data); // Verifica la estructura
      this.dataSource=new MatTableDataSource(data)
    });
    this.pS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    });
}

eliminar(id: number): void {
  this.pS.delete(id).subscribe(
    () => {
      // Recargar la lista después de eliminar
      this.pS.list().subscribe(data => {
        this.pS.setList(data);
        this.snackBar.open('Pregunta eliminada correctamente.', 'Cerrar', {
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
}
