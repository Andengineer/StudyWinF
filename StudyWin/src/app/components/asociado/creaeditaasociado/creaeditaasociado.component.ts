import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { Asociado } from '../../../models/Asociado';
import { AsociadoService } from '../../../services/asociado.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaeditaasociado',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule,MatInputModule, MatFormFieldModule,MatSelectModule,MatButtonModule,MatIconModule,ReactiveFormsModule,CommonModule,MatDatepickerModule],
  templateUrl: './creaeditaasociado.component.html',
  styleUrl: './creaeditaasociado.component.css'
})
export class CreaeditaasociadoComponent {
  form:FormGroup=new FormGroup({});
  asociado:Asociado=new Asociado()
  id:number=0;
  edicion:boolean=false
  role:string=''

  constructor(private aS:AsociadoService, private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null
      //captura data que viene de la lista |^|
      this.init()
    })
    this.form=this.formBuilder.group({
      hempresa:['',Validators.required],
      hdescripcion:['',Validators.required],
      hruc:['',Validators.required],
      hfechainicio:['',Validators.required],
      hfechafin:['',Validators.required],
      himagen:['',Validators.required],
      hcodigo:[''] 
    });
  }

  aceptar(){
    if(this.form.valid){
      this.asociado.id_asociado=this.form.value.hcodigo;
      this.asociado.empresa=this.form.value.hempresa;
      this.asociado.descripcion=this.form.value.hdescripcion;
      this.asociado.ruc=this.form.value.hruc;
      this.asociado.fecha_inicio=this.form.value.hfechainicio;
      this.asociado.fecha_fin=this.form.value.hfechafin;
      this.asociado.imagen=this.form.value.himagen;
      
      if(this.edicion){
        this.aS.update(this.asociado).subscribe(d=>{
          this.aS.list().subscribe(d=>{
            this.aS.setList(d)
          })
        })
      }else{
        this.aS.insert(this.asociado).subscribe(d=>{
          this.aS.list().subscribe(d=>{
            this.aS.setList(d)
          });
        });
      }
      this.router.navigate(['asociadoadmin'])
    }
  }

  init(){
    if(this.edicion){
      this.aS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          hcodigo:new FormControl(data.id_asociado),
          hempresa:new FormControl(data.empresa),
          hdescripcion:new FormControl(data.descripcion),
          hruc: new FormControl(data.ruc)  ,
          hfechainicio:new FormControl(data.fecha_inicio),
          hfechafin:new FormControl(data.fecha_fin),
          himagen:new FormControl(data.imagen)
        })
      })
    }
  }
  isClient() {
    return this.role === 'CLIENT';
  }
  isDeveloper() {
    return this.role === 'DEVELOPER';
  }
}
