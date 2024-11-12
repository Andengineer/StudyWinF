import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Asociado } from '../../../models/Asociado';
import { AsociadoService } from '../../../services/asociado.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { RecompensaService } from '../../../services/recompensa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-asociado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-asociado.component.html',
  styleUrl: './listar-asociado.component.css'
})
export class ListarAsociadoComponent implements OnInit{
  dataSource:MatTableDataSource<Asociado>=new MatTableDataSource()
  role: string = '';
  identasociado:number=0

  constructor(private ls: LoginService, private aS:AsociadoService, private router:Router){}
  ngOnInit(): void {
    this.aS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    });
  }
  isclient() {
    this.role = this.ls.showRole();
    return this.role === 'CLIENT';
  }
  setIdasociado(value: number) {
    this.identasociado = value;
    this.aS.setIdasociado(value);
    this.router.navigate(['/recompensas']);
  }
}
