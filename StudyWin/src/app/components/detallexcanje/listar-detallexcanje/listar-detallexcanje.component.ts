import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { DetalleXCanje } from '../../../models/DetalleXCanje';
import { DetallexcanjeService } from '../../../services/detallexcanje.service';

@Component({
  selector: 'app-listar-detallexcanje',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: './listar-detallexcanje.component.html',
  styleUrl: './listar-detallexcanje.component.css'
})
export class ListarDetallexcanjeComponent {
  dataSource:MatTableDataSource<DetalleXCanje>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','eliminar','actualizar']
  constructor(private dxcS:DetallexcanjeService){}
  ngOnInit(): void {
    this.dxcS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    });
    this.dxcS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    });
}
eliminar(id:number){
  this.dxcS.delete(id).subscribe(data=>{
    this.dxcS.list().subscribe(data=>{
      this.dxcS.setList(data)
    })
  })
}
}
