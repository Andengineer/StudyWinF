import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Recompensa } from '../../../models/Recompensa';
import { RecompensaService } from '../../../services/recompensa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-recompensa',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './listar-recompensa.component.html',
  styleUrl: './listar-recompensa.component.css'
})
export class ListarRecompensaComponent implements OnInit {
  dataSource:MatTableDataSource<Recompensa>=new MatTableDataSource()

  constructor(private rS:RecompensaService){}
  ngOnInit(): void {
    this.rS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    });
  }
}
