import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Asociado } from '../../../models/Asociado';
import { AsociadoService } from '../../../services/asociado.service';

@Component({
  selector: 'app-listar-asociado',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listar-asociado.component.html',
  styleUrl: './listar-asociado.component.css'
})
export class ListarAsociadoComponent implements OnInit{
  dataSource:MatTableDataSource<Asociado>=new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7']

  constructor(private aS:AsociadoService){}
  ngOnInit(): void {
    
    this.aS.list().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    });
  }

}
