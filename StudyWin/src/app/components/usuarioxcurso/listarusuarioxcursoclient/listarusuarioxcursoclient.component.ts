import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { UsuarioXCurso } from '../../../models/UsuarioXCurso';
import { LoginService } from '../../../services/login.service';
import { UsuarioXCursoService } from '../../../services/usuario-xcurso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-listarusuarioxcursoclient',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatPaginatorModule,CommonModule],
  templateUrl: './listarusuarioxcursoclient.component.html',
  styleUrl: './listarusuarioxcursoclient.component.css'
})
export class ListarusuarioxcursoclientComponent {
  dataSource: MatTableDataSource<UsuarioXCurso> = new MatTableDataSource();
  constructor(private cS:CursoService,private snackBar: MatSnackBar,private uxcS: UsuarioXCursoService, private uS: LoginService, private ls:LoginService) {}
  role: string = '';
  usXcurso: UsuarioXCurso = new UsuarioXCurso()
  ngOnInit(): void {
    // Obtiene la lista completa de canjes y filtra por usuario
    this.uxcS.list().subscribe(data => {
      // Filtra los datos solo para el usuario actual
      const filteredData = data.filter((element: UsuarioXCurso) => element.usuario.id_usuario === this.uS.getId());
      this.dataSource = new MatTableDataSource(filteredData);
    });
  }
  isclient() {
    this.role = this.ls.showRole();
    return this.role === 'CLIENT';
  }
  Comenzar(idcurso: number) {//
    const userId = this.ls.getId();
    // Verificar si el usuario ya tiene registrado el curso
    this.uxcS.list().subscribe(data => {
      const userCourses = data.filter((element: UsuarioXCurso) =>
        element.usuario.id_usuario === userId && element.curso.id_curso === idcurso
      );

      if (userCourses.length > 0) {
        // Mostrar mensaje de error si el curso ya está inscrito para el usuario
        this.snackBar.open('Continuando curso', 'Cerrar', {
          duration: 3000,
        });
      } else {
        // Asociar el curso si no está registrado
        this.usXcurso.curso.id_curso = idcurso;
        this.usXcurso.usuario.id_usuario = userId;
        this.uxcS.insert(this.usXcurso).subscribe(d => {
          
        });
      }
    });
  }
  setIdcurso(value: number) {
    this.cS.setIdcurso(value);
  }
  
}
