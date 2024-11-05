import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Asociado } from '../../../models/Asociado';
import { AsociadoService } from '../../../services/asociado.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-asociado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-asociado.component.html',
  styleUrl: './listar-asociado.component.css'
})
export class ListarAsociadoComponent implements OnInit{
  dataSource:MatTableDataSource<Asociado>=new MatTableDataSource()

  constructor(private aS:AsociadoService){}
  ngOnInit(): void {
    this.aS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    });
  }

}
