import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Canje } from '../../../models/Canje';
import { CanjeService } from '../../../services/canje.service';

@Component({
  selector: 'app-listar-canje',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listar-canje.component.html',
  styleUrl: './listar-canje.component.css'
})
export class ListarCanjeComponent implements OnInit {
  dataSource:MatTableDataSource<Canje>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5']

  constructor(private cS:CanjeService){}
  ngOnInit(): void {
    
      this.cS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
        console.log(data)
      });
      this.cS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
      });
  }
}
