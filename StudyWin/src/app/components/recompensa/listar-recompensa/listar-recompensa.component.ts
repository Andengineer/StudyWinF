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
import { UsuarioService } from '../../../services/usuario.service';
import { RolService } from '../../../services/rol.service';
import { Role } from '../../../models/Role';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  rola:Role=new Role()
    rols:string='CLIENT'
  constructor(private snackBar: MatSnackBar,private rolS:RolService,private dcS:DetallexcanjeService,private rS: RecompensaService, private ls: LoginService, private cS: CanjeService, private aS:AsociadoService, private uS:UsuarioService) { }
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
  Canjear(value:number,value2:number,value3:number) {
    const idRecompensa =value3 ;

    this.rS.listId(idRecompensa).subscribe(recompensa => {
      this.uS.listId(this.ls.getId()).subscribe(usuario => {
        if (usuario.puntos_usuario >= recompensa.puntos) {
          if (value2 > 0) {
            usuario.puntos_usuario -= recompensa.puntos;
            recompensa.stock = recompensa.stock-1;

            // Actualiza el usuario y sus puntos
            this.uS.update(usuario).subscribe(() => {
              console.log('Puntos del usuario actualizados.');

              // Actualiza el stock de la recompensa
              this.rS.update(recompensa).subscribe(() => {
                console.log('Stock de recompensa actualizado.');

                // Crear o actualizar el rol del usuario
                this.rola.user = usuario;
                this.rola.rol = this.rols;
                this.rolS.insert(this.rola).subscribe(() => {
                  console.log('Rol asignado o actualizado correctamente.');

                  // Registrar el canje y el detalle de canje
                  this.canje.departamento = 'Lima';
                  this.canje.distrito = 'Barranco';
                  this.canje.fecha = new Date();
                  this.canje.usuario.id_usuario = usuario.id_usuario;

                  this.cS.insert(this.canje).subscribe(d => {
                    const detalleCanje = new DetalleXCanje();
                    detalleCanje.canje.id_canje = d.id_canje;
                    detalleCanje.recompensa.id_recompensa = value;
                    detalleCanje.cantidadProductoCanje = 1;

                    this.dcS.insert(detalleCanje).subscribe(() => {
                      this.snackBar.open('Producto canjeado con éxito', 'Cerrar', { duration: 3000 });
                    });
                  });
                });
              });
            });
          } else {
            this.snackBar.open('Recompensa no disponible', 'Cerrar', { duration: 3000 });
          }
        } else {
          this.snackBar.open('No tienes suficientes puntos para canjear esta recompensa.', 'Cerrar', { duration: 3000 });
        }
      });
    });
  }
  
  setIdrecompensa(value: number) {
    this.rS.setIdrecompensa(value);
  }
}
