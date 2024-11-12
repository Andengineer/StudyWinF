import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Recompensa } from '../../../models/Recompensa';
import { RecompensaService } from '../../../services/recompensa.service';
import { CommonModule } from '@angular/common';
import { AsociadoService } from '../../../services/asociado.service';

@Component({
  selector: 'app-listar-recompensa',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './listar-recompensa.component.html',
  styleUrl: './listar-recompensa.component.css'
})
export class ListarRecompensaComponent implements OnInit {
  dataSource:MatTableDataSource<Recompensa>=new MatTableDataSource()

  constructor(private rS:RecompensaService, private aS:AsociadoService){}
  ngOnInit(): void {
    // Obtiene el ID del asociado seleccionado desde el servicio AsociadoService
    const asociadoId = this.aS.getIdasociado();

    // Llama al RecompensaService para obtener todas las recompensas
    this.rS.list().subscribe((data) => {
      // Si hay un id de asociado, filtra; si no, muestra todas las recompensas
      const filteredRecompensas = asociadoId ? data.filter((recompensa: Recompensa) => recompensa.asociado.id_asociado === asociadoId) : data;
      this.dataSource = new MatTableDataSource(filteredRecompensas);
    });
  }
}
