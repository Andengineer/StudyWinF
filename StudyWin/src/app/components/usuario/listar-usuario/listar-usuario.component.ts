import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-listar-usuario',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listar-usuario.component.html',
  styleUrl: './listar-usuario.component.css'
})
export class ListarUsuarioComponent {
  dataSource:MatTableDataSource<Usuario>= new MatTableDataSource()
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','c8','c9']

  constructor(private uS:UsuarioService){}
  ngOnInit(): void {
      this.uS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      });
  }
}
