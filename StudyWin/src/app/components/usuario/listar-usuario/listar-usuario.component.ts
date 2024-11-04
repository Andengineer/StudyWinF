import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-usuario',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.css'
})
export class ListarUsuarioComponent implements OnInit{
  dataSource:MatTableDataSource<Usuario>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c7','c8','eliminar','actualizar']

  constructor(private uS:UsuarioService){}
  ngOnInit(): void {
      this.uS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      });
      this.uS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
      });
  }
  eliminar(id:number){
    this.uS.delete(id).subscribe(data=>{
      this.uS.list().subscribe(data=>{
        this.uS.setList(data)
      })
    })
  }
}
