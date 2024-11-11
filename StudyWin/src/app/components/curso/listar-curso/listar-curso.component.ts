import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Curso } from '../../../models/Curso';
import { CursoService } from '../../../services/curso.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { UsuarioXCursoService } from '../../../services/usuario-xcurso.service';
import { UsuarioXCurso } from '../../../models/UsuarioXCurso';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-listar-curso',
  standalone: true,
  imports: [MatTableModule, CommonModule,RouterModule],
  templateUrl: './listar-curso.component.html',
  styleUrl: './listar-curso.component.css'
})
export class ListarCursoComponent implements OnInit {
  dataSource: MatTableDataSource<Curso> = new MatTableDataSource();
  usXcurso: UsuarioXCurso = new UsuarioXCurso()
  identcurso:number=0
  showTitle: boolean = true; // Controla la visibilidad del título
  role: string = '';
  constructor(private cS: CursoService, private ls: LoginService, private uxcS: UsuarioXCursoService,private snackBar: MatSnackBar) { }
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
  isclient() {
    this.role = this.ls.showRole();
    return this.role === 'CLIENT';
  }
  gettitle() {
    return this.cS.gettitle
  }
  ngOnInit(): void {
    this.cS.gettitle().subscribe(visible => {
      this.showTitle = visible;
    });

    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    });
    this.cS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  setIdcanje(value: number) {
    this.identcurso = value;
    this.cS.setIdcurso(value);
  }
}
