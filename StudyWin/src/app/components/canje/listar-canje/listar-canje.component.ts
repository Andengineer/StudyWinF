import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Canje } from '../../../models/Canje';
import { CanjeService } from '../../../services/canje.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-canje',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: './listar-canje.component.html',
  styleUrl: './listar-canje.component.css'
})
export class ListarCanjeComponent implements OnInit {
  dataSource:MatTableDataSource<Canje>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','eliminar','actualizar']

  constructor(private cS:CanjeService){}
  ngOnInit(): void {
    
      this.cS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      });
      this.cS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
      });
  }
  eliminar(id:number){
    this.cS.delete(id).subscribe(data=>{
      this.cS.list().subscribe(data=>{
        this.cS.setList(data)
      })
    })
  }
}
