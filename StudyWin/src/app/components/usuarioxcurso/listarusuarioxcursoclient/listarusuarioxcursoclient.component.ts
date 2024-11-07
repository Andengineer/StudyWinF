import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { UsuarioXCurso } from '../../../models/UsuarioXCurso';
import { LoginService } from '../../../services/login.service';
import { UsuarioXCursoService } from '../../../services/usuario-xcurso.service';

@Component({
  selector: 'app-listarusuarioxcursoclient',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatPaginatorModule,CommonModule],
  templateUrl: './listarusuarioxcursoclient.component.html',
  styleUrl: './listarusuarioxcursoclient.component.css'
})
export class ListarusuarioxcursoclientComponent {
  dataSource: MatTableDataSource<UsuarioXCurso> = new MatTableDataSource();
  user: string = '';
  constructor(private uxcS: UsuarioXCursoService, private uS: LoginService) {}

  ngOnInit(): void {
    // Obtiene el username desde el servicio LoginService
    this.user = this.uS.getusername();
    // Obtiene la lista completa de canjes y filtra por usuario
    this.uxcS.list().subscribe(data => {
      // Filtra los datos solo para el usuario actual
      const filteredData = data.filter((element: UsuarioXCurso) => element.usuario.email === this.user);
      this.dataSource = new MatTableDataSource(filteredData);
      console.log(this.user);
    });
  }
}
