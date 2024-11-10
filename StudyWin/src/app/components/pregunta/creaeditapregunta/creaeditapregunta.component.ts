import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Pregunta } from '../../../models/Pregunta';
import { Cuestionario_academico } from '../../../models/Cuestionario_academico';
import { PreguntaService } from '../../../services/pregunta.service';
import { CuestionarioAcademicoService } from '../../../services/cuestionario-academico.service';

@Component({
  selector: 'app-creaeditapregunta',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatFormFieldModule,MatSelectModule,MatButtonModule,MatIconModule,ReactiveFormsModule,CommonModule],
  templateUrl: './creaeditapregunta.component.html',
  styleUrl: './creaeditapregunta.component.css'
})
export class CreaeditapreguntaComponent {
  form:FormGroup=new FormGroup({});
  pregunta:Pregunta=new Pregunta()
  id:number=0;
  edicion:boolean=false
  listaCuestionarios:Cuestionario_academico[]=[];

  constructor(private pS:PreguntaService, private cS:CuestionarioAcademicoService, private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      console.log("ID obtenido de la ruta:", this.id); // Verifica el valor de ID
      this.edicion=data['id']!=null
      //captura data que viene de la lista |^|
      this.init()
    })
    this.form=this.formBuilder.group({
      hpregunta:['',Validators.required],
      hpuntos:['',Validators.required],
      hrespuesta:['',Validators.required],
      hcuestionario:['',Validators.required],
      hcodigo:[''] 
    });
    //para la lista foranea de asociados
    this.cS.list().subscribe(data=>{
      this.listaCuestionarios=data
    })
  } 
  
  aceptar(){
    if(this.form.valid){
      this.pregunta.id_pregunta=this.form.value.hcodigo;
      this.pregunta.pregunta=this.form.value.hpregunta;
      this.pregunta.puntos=this.form.value.hpuntos;
      this.pregunta.respuesta=this.form.value.hrespuesta;
      this.pregunta.cuestionario.id_cuestionario=this.form.value.hcuestionario;
      
      if(this.edicion){
        this.pS.update(this.pregunta).subscribe(d=>{
          this.pS.list().subscribe(d=>{
            this.pS.setList(d)
          })
        })
      }else{
        this.pS.insert(this.pregunta).subscribe(d=>{
          this.pS.list().subscribe(d=>{
            this.pS.setList(d)
          });
        });
      }
      this.router.navigate(['preguntaadmin'])
    }
  }

  init(){
    if(this.edicion){
      this.pS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          hcodigo:new FormControl(data.id_pregunta),
          hpregunta:new FormControl(data.pregunta),
          hpuntos:new FormControl(data.puntos),
          hrespuesta: new FormControl(data.respuesta),
          hcuestionario:new FormControl(data.cuestionario.id_cuestionario),
        })
      })
    }
  }
}
