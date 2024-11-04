import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditausuario',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatFormFieldModule,MatSelectModule,MatButtonModule,MatIconModule,ReactiveFormsModule,CommonModule],
  templateUrl: './creaeditausuario.component.html',
  styleUrl: './creaeditausuario.component.css'
})
export class CreaeditausuarioComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  usuario:Usuario=new Usuario();
  hidePassword = true;
  id:number=0;
  edicion:boolean=false
  //lista de instituciones
  listaInstituciones:{ value:string, viewValue:string}[]=[
    { value: 'Universidad Peruana de Ciencias Aplicadas', viewValue: 'Universidad Peruana de Ciencias Aplicadas' },
    { value: 'Pontificia Universidad Católica del Perú', viewValue: 'Pontificia Universidad Católica del Perú' },
    { value: 'Universidad Nacional Mayor de San Marcos', viewValue: 'Universidad Nacional Mayor de San Marcos' },
    { value: 'Universidad de Lima', viewValue: 'Universidad de Lima' },
    { value: 'Universidad Nacional de Ingeniería', viewValue: 'Universidad Nacional de Ingeniería' },
    { value: 'Universidad ESAN', viewValue: 'Universidad ESAN' },
    { value: 'Universidad del Pacífico', viewValue: 'Universidad del Pacífico' },
    { value: 'Universidad San Ignacio de Loyola', viewValue: 'Universidad San Ignacio de Loyola' }
  ];

constructor(private uS:UsuarioService, private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null
      //captura data que viene de la lista |^|
      this.init()
    })
      this.form=this.formBuilder.group({
        hnombre:['',Validators.required],
        hapellidos:['',Validators.required],
        hinstitucion:['',Validators.required],
        hdni:['',Validators.required],
        hemail: ['', [Validators.required, Validators.email]],
        hpassword:['',Validators.required],
        hcodigo:['']
      })
  }

  aceptar(){
    if(this.form.valid){
      this.usuario.id_usuario=this.form.value.hcodigo;
      this.usuario.nombres=this.form.value.hnombre;
      this.usuario.apellidos=this.form.value.hapellidos;
      this.usuario.institucion_educativa=this.form.value.hinstitucion;
      this.usuario.dni=this.form.value.hdni;
      this.usuario.email=this.form.value.hemail;
      this.usuario.contrasena=this.form.value.hpassword;
      this.usuario.puntos_usuario=0;
      this.usuario.enabled=true;
      if(this.edicion){
        this.uS.update(this.usuario).subscribe(d=>{
          this.uS.list().subscribe(d=>{
            this.uS.setList(d)
          })
        })
      }else{
        this.uS.insert(this.usuario).subscribe(d=>{
          this.uS.list().subscribe(d=>{
            this.uS.setList(d)
          })
        })
      }

    }
    this.router.navigate(['usuario'])
  }
  
  init(){
    if(this.edicion){
      this.uS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          hcodigo:new FormControl(data.id_usuario),
          hnombre: new FormControl(data.nombres),
          hapellidos:new FormControl(data.apellidos),
          hdni:new FormControl(data.dni),
          hemail:new FormControl(data.email),
          hpassword:new FormControl(data.contrasena),
          hinstitucion:new FormControl(data.institucion_educativa)
        })
      })
    }
  }
}
