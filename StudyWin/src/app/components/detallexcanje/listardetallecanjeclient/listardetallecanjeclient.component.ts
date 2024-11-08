import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DetalleXCanje } from '../../../models/DetalleXCanje';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DetallexcanjeService } from '../../../services/detallexcanje.service';
import { CommonModule } from '@angular/common';
import { CanjeService } from '../../../services/canje.service';

@Component({
  selector: 'app-listardetallecanjeclient',
  standalone: true,
  imports: [MatTableModule,CommonModule],
  templateUrl: './listardetallecanjeclient.component.html',
  styleUrl: './listardetallecanjeclient.component.css'
})
export class ListardetallecanjeclientComponent implements OnInit {
  dataSource: MatTableDataSource<DetalleXCanje> = new MatTableDataSource();
  displayedColumns: string[] = ['c2', 'c4']
  constructor(private route: ActivatedRoute, private dxcS: DetallexcanjeService,private cS:CanjeService) {}
  ngOnInit(): void {
    // Llama al servicio y asigna los datos al dataSource
    this.dxcS.list().subscribe(data => {
      // Filtra los datos solo para el usuario actual
      const filteredData = data.filter((element: DetalleXCanje) => element.canje.id_canje === this.cS.getIdcanje());
      this.dataSource = new MatTableDataSource(filteredData);
    });
  }
}
