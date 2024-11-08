import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
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
  identcanje:number=0
  constructor(private cS: CanjeService, private uS: LoginService) {}
  ngOnInit(): void {
    // Obtiene la lista completa de canjes y filtra por usuario
    this.cS.list().subscribe(data => {
      // Filtra los datos solo para el usuario actual
      const filteredData = data.filter((element: Canje) => element.usuario.id_usuario === this.uS.getId());
      this.dataSource = new MatTableDataSource(filteredData);
    });
  }
  setIdcanje(value: number) {
    this.identcanje = value;
    this.cS.setIdcanje(value); 
  }
}

