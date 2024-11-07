import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Canje } from '../../../models/Canje';
import { CanjeService } from '../../../services/canje.service';
import { LoginService } from '../../../services/login.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarcanjeclient',
  standalone: true,
  imports: [MatTableModule, CommonModule,RouterModule],
  templateUrl: './listarcanjeclient.component.html',
  styleUrl: './listarcanjeclient.component.css'
})
export class ListarcanjeclientComponent {
  dataSource: MatTableDataSource<Canje> = new MatTableDataSource();
  user: string = '';

  constructor(private cS: CanjeService, private uS: LoginService) {}

  ngOnInit(): void {
    // Obtiene el username desde el servicio LoginService
    this.user = this.uS.getusername();
    // Obtiene la lista completa de canjes y filtra por usuario
    this.cS.list().subscribe(data => {
      // Filtra los datos solo para el usuario actual
      const filteredData = data.filter((element: Canje) => element.usuario.email === this.user);
      this.dataSource = new MatTableDataSource(filteredData);
      console.log(this.user);
    });
  }
}

