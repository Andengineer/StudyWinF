import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../../models/Role';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-registrarrol',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './registrarrol.component.html',
  styleUrl: './registrarrol.component.css'
})
export class RegistrarrolComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  rol: Role = new Role();
  //lista de usuarios
  listaUsuarios: Usuario[] = [];
  constructor(private uS: UsuarioService, private rS: RolService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      husuario:['',Validators.required],
      hrol:['',Validators.required],
      hcodigo:['']
    });
    //para la lista foranea de usuarios
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
  }
  aceptar(){
    if(this.form.valid){
      this.rol.id=this.form.value.hcodigo
      this.rol.rol=this.form.value.hrol;
      this.rol.user.id_usuario=this.form.value.husuario;
      this.rS.insert(this.rol).subscribe(d=>{
      })
    }
    
  }
}
