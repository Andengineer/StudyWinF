import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Canje } from '../../../models/Canje';
import { CanjeService } from '../../../services/canje.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-creaeditacanje',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule,MatInputModule, MatFormFieldModule,MatSelectModule,MatButtonModule,MatIconModule,ReactiveFormsModule,CommonModule,MatDatepickerModule],
  templateUrl: './creaeditacanje.component.html',
  styleUrl: './creaeditacanje.component.css'
})
export class CreaeditacanjeComponent {
  form:FormGroup=new FormGroup({});
  canje:Canje=new Canje();
  id:number=0;
  edicion:boolean=false
  listaUsuarios:Usuario[]=[];

  constructor(private uS:UsuarioService,private cS:CanjeService, private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null
      //captura data que viene de la lista |^|
      this.init()
    })
    this.form=this.formBuilder.group({
      hfecha:['',Validators.required],
      husuario:['',Validators.required],
      hdepartamento:['',Validators.required],
      hdistrito:['',Validators.required],
      hcodigo:['']
    });
    //para la lista foranea de usuarios
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
  }
  aceptar(){
    if(this.form.valid){
      this.canje.id_canje=this.form.value.hcodigo;
      this.canje.departamento=this.form.value.hdepartamento;
      this.canje.usuario.id_usuario=this.form.value.husuario;
      this.canje.distrito=this.form.value.hdistrito;
      
      if(this.edicion){
        this.cS.update(this.canje).subscribe(d=>{
          this.cS.list().subscribe(d=>{
            this.cS.setList(d)
          })
        })
      }else{
        this.cS.insert(this.canje).subscribe(d=>{
          this.cS.list().subscribe(d=>{
            this.cS.setList(d)
          });
        });
      }
      this.router.navigate(['canje'])
    }
    
  }
  init(){
    if(this.edicion){
      this.cS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          hcodigo:new FormControl(data.id_canje),
          hfecha:new FormControl(data.fecha),
          husuario:new FormControl(data.usuario.email),
          hdepartamento: new FormControl(data.departamento),
          hdistrito: new FormControl(data.distrito)          
        })
      })
    }
  }
}
