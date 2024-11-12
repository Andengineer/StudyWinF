import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Recompensa } from '../../../models/Recompensa';
import { RecompensaService } from '../../../services/recompensa.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { CanjeService } from '../../../services/canje.service';
import { Canje } from '../../../models/Canje';
import { DetalleXCanje } from '../../../models/DetalleXCanje';
import { DetallexcanjeService } from '../../../services/detallexcanje.service';
import { AsociadoService } from '../../../services/asociado.service';


@Component({
  selector: 'app-listar-recompensa',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './listar-recompensa.component.html',
  styleUrl: './listar-recompensa.component.css'
})
export class ListarRecompensaComponent implements OnInit {
  dataSource: MatTableDataSource<Recompensa> = new MatTableDataSource()
  canje: Canje = new Canje;
  role: string = '';
  constructor(private dcS:DetallexcanjeService,private rS: RecompensaService, private ls: LoginService, private cS: CanjeService, private aS:AsociadoService) { }
  ngOnInit(): void {
    const verificador = this.rS.getBolean();
    if(verificador==true){
      console.log(this.rS.getBolean())
    // Obtiene el ID del asociado seleccionado desde el servicio AsociadoService
    const asociadoId = this.aS.getIdasociado();

    // Llama al RecompensaService para obtener todas las recompensas
    this.rS.list().subscribe((data) => {
      // Si hay un id de asociado, filtra; si no, muestra todas las recompensas
      const filteredRecompensas = asociadoId ? data.filter((recompensa: Recompensa) => recompensa.asociado.id_asociado === asociadoId) : data;
      this.dataSource = new MatTableDataSource(filteredRecompensas);
    });
    }else{
      console.log(this.rS.getBolean())
      this.rS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data)

      });
    }
  }
  isclient() {
    this.role = this.ls.showRole();
    return this.role === 'CLIENT';
  }
  Canjear() {
    this.canje.departamento = 'Lima'
    this.canje.distrito = 'Barranco'
    this.canje.fecha = new Date();
    this.canje.usuario.id_usuario = this.ls.getId()
     // Llamamos al servicio de canje para crear el canje
    this.cS.insert(this.canje).subscribe(d => {
      const idRecompensa = this.rS.getIdrecompensa();

      // Una vez creado el canje, creamos el detalle usando el id del canje creado y la cantidad
      const detalleCanje = new DetalleXCanje();
      console.log("Mostrando el valor de id_canje:");
      console.log(d.id_canje);
      detalleCanje.canje.id_canje = d.id_canje;
      detalleCanje.recompensa.id_recompensa = idRecompensa;
      detalleCanje.cantidadProductoCanje = 1;

      // Insertamos el detalle canje
      this.dcS.insert(detalleCanje).subscribe(() => {
        console.log('Detalle canje creado con éxito');
      });
    });
  }
  setIdrecompensa(value: number) {
    this.rS.setIdrecompensa(value);
  }
}
