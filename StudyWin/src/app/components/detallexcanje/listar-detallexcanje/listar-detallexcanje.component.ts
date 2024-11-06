import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { DetalleXCanje } from '../../../models/DetalleXCanje';
import { DetallexcanjeService } from '../../../services/detallexcanje.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-detallexcanje',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule,MatPaginatorModule],
  templateUrl: './listar-detallexcanje.component.html',
  styleUrl: './listar-detallexcanje.component.css'
})
export class ListarDetallexcanjeComponent {
  dataSource:MatTableDataSource<DetalleXCanje>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','eliminar','actualizar']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dxcS:DetallexcanjeService){}
  ngOnInit(): void {
    this.dxcS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
    });
    this.dxcS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
}
eliminar(id:number){
  this.dxcS.delete(id).subscribe(data=>{
    this.dxcS.list().subscribe(data=>{
      this.dxcS.setList(data)
      this.dataSource.paginator = this.paginator;
    })
  })
}
ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  
}
}
