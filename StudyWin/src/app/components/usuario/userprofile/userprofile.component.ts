import { Component, OnInit } from '@angular/core';
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
export class UserprofileComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  constructor(private cS: UsuarioService, private uS: LoginService) {}
  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      // Filtra los datos solo para el usuario actual
      const filteredData = data.filter((element: Usuario) => element.id_usuario === this.uS.getId());
      this.dataSource = new MatTableDataSource(filteredData);
    });
  }
}
