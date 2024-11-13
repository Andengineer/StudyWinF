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
import { Curso } from '../../../models/Curso';
import { Cuestionario_academico } from '../../../models/Cuestionario_academico';
import { CursoService } from '../../../services/curso.service';
import { CuestionarioAcademicoService } from '../../../services/cuestionario-academico.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditacuestionarioacademico',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatFormFieldModule,MatSelectModule,MatButtonModule,MatIconModule,ReactiveFormsModule,CommonModule,MatDatepickerModule],
  templateUrl: './creaeditacuestionarioacademico.component.html',
  styleUrl: './creaeditacuestionarioacademico.component.css'
})
export class CreaeditacuestionarioacademicoComponent {
  form:FormGroup=new FormGroup({});
  cuestionario:Cuestionario_academico=new Cuestionario_academico()
  id:number=0;
  edicion:boolean=false
  listaCursos:Curso[]=[];

  constructor(private caS:CuestionarioAcademicoService, private cS:CursoService, private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute, private snackBar:MatSnackBar){}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null
      //captura data que viene de la lista |^|
      this.init()
    })
    this.form=this.formBuilder.group({
      hnombre:['',Validators.required],
      hdescripcion:['',Validators.required],
      htiempo:['',Validators.required],
      hcurso:['',Validators.required],
      himagen:['',Validators.required],
      hcodigo:[''] 
    });
    //para la lista foranea de asociados
    this.cS.list().subscribe(data=>{
      this.listaCursos=data
    })
  }

  aceptar(){
    const tiempo = this.form.value.htiempo;
  
    if (tiempo < 0) {
      this.snackBar.open('No se puede ingresar tiempos negativos, por favor vuelva a digitar el tiempo', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if(this.form.valid){
      this.cuestionario.id_cuestionario=this.form.value.hcodigo;
      this.cuestionario.nombres=this.form.value.hnombre;
      this.cuestionario.descripcion=this.form.value.hdescripcion;
      this.cuestionario.tiempo_limite=this.form.value.htiempo;
      this.cuestionario.curso.id_curso=this.form.value.hcurso;
      this.cuestionario.imagen=this.form.value.himagen;
      
      if(this.edicion){
        this.caS.update(this.cuestionario).subscribe(d=>{
          this.caS.list().subscribe(d=>{
            this.caS.setList(d)
          })
        })
      }else{
        this.caS.insert(this.cuestionario).subscribe(d=>{
          this.caS.list().subscribe(d=>{
            this.caS.setList(d)
          });
        });
      }
      this.router.navigate(['cuestionarioacademicoadmin'])
    }
  }

  init(){
    if(this.edicion){
      this.caS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          hcodigo:new FormControl(data.id_cuestionario),
          hnombre:new FormControl(data.nombres),
          hdescripcion:new FormControl(data.descripcion),
          htiempo: new FormControl(data.tiempo_limite),
          hcurso:new FormControl(data.curso.id_curso),
          himagen:new FormControl(data.imagen)
        })
      })
    }
  }
}
