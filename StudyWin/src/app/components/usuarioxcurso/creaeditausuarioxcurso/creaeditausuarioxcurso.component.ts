import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UsuarioXCurso } from '../../../models/UsuarioXCurso';
import { Usuario } from '../../../models/Usuario';
import { Curso } from '../../../models/Curso';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioXCursoService } from '../../../services/usuario-xcurso.service';
import { UsuarioService } from '../../../services/usuario.service';
import { CursoService } from '../../../services/curso.service';

@Component({
  selector: 'app-creaeditausuarioxcurso',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatFormFieldModule,MatSelectModule,MatButtonModule,MatIconModule,ReactiveFormsModule,CommonModule],
  templateUrl: './creaeditausuarioxcurso.component.html',
  styleUrl: './creaeditausuarioxcurso.component.css'
})
export class CreaeditausuarioxcursoComponent implements OnInit {
  form:FormGroup=new FormGroup({});
  usuarioxcurso:UsuarioXCurso=new UsuarioXCurso()
  hidePassword = true;
  id:number=0;
  edicion:boolean=false
  listaUsuarios:Usuario[]=[];
  listacursos:Curso[]=[];
  constructor(private uxcS:UsuarioXCursoService,private uS:UsuarioService,private cS:CursoService ,private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null
      //captura data que viene de la lista |^|
      this.init()
    })
    this.form=this.formBuilder.group({
      hcurso:['',Validators.required],
      husuario:['',Validators.required],
      hcodigo:['']
    });
    //para la lista foranea de usuarios
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
    //para la lista foranea de cursos
    this.cS.list().subscribe(data=>{
      this.listacursos=data
    })
  }
  aceptar(){
    if(this.form.valid){
      this.usuarioxcurso.id_usuariosxcurso=this.form.value.hcodigo;
      this.usuarioxcurso.usuario.id_usuario=this.form.value.husuario;
      this.usuarioxcurso.curso.id_curso=this.form.value.hcurso;
      
      if(this.edicion){
        this.uxcS.update(this.usuarioxcurso).subscribe(d=>{
          this.uxcS.list().subscribe(d=>{
            this.uxcS.setList(d)
          })
        })
      }else{
        this.uxcS.insert(this.usuarioxcurso).subscribe(d=>{
          this.uxcS.list().subscribe(d=>{
            this.uxcS.setList(d)
          });
        });
      }
      this.router.navigate(['usuarioxcurso'])
    }
    
  }
  init(){
    if(this.edicion){
      this.uxcS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          hcodigo:new FormControl(data.id_usuariosxcurso),
          husuario:new FormControl(data.usuario.id_usuario),
          hcurso: new FormControl(data.curso.id_curso)         
        })
      })
    }
  }
}
