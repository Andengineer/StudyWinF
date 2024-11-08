import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LoginService } from '../../../services/login.service';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [MatTableModule, CommonModule,RouterModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  user: string = '';
  constructor(private cS: UsuarioService, private uS: LoginService) {}
  ngOnInit(): void {
    // Obtiene el username desde el servicio LoginService
    this.user = this.uS.getusername();
    this.cS.list().subscribe(data => {
      // Filtra los datos solo para el usuario actual
      const filteredData = data.filter((element: Usuario) => element.email === this.user);
      this.dataSource = new MatTableDataSource(filteredData);
    });
  }
}
