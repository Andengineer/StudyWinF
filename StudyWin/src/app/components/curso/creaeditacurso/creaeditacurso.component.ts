import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Curso } from '../../../models/Curso';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-creaeditacurso',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatFormFieldModule,MatSelectModule,MatButtonModule,MatIconModule,ReactiveFormsModule,CommonModule],
  templateUrl: './creaeditacurso.component.html',
  styleUrl: './creaeditacurso.component.css'
})
export class CreaeditacursoComponent {
  form:FormGroup=new FormGroup({});
  curso:Curso=new Curso()
  id:number=0;
  edicion:boolean=false
  listaCategoria:{ value:string, viewValue:string}[]=[
    { value: 'Ciencias de la Computación', viewValue: 'Ciencias de la Computación' },
    { value: 'Ingeniería', viewValue: 'Ingeniería' },
    { value: 'Negocios', viewValue: 'Negocios' },
    { value: 'Ciencias Sociales', viewValue: 'Ciencias Sociales' },
    { value: 'Arte y Humanidades', viewValue: 'Arte y Humanidades' },
    { value: 'Matemáticas', viewValue: 'Matemáticas' },
    { value: 'Ciencias de la Salud', viewValue: 'Ciencias de la Salud' },
    { value: 'Educación', viewValue: 'Educación' },
    { value: 'Derecho', viewValue: 'Derecho' },
    { value: 'Economía', viewValue: 'Economía' },
    { value: 'Idiomas', viewValue: 'Idiomas' },
    { value: 'Tecnología de la Información', viewValue: 'Tecnología de la Información' },
    { value: 'Comunicación', viewValue: 'Comunicación' },
    { value: 'Psicología', viewValue: 'Psicología' }
  ]
  constructor(private cS:CursoService, private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute,private snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null
      //captura data que viene de la lista |^|
      this.init()
    })
    this.form=this.formBuilder.group({
      hnombre:['',Validators.required],
      hcategoria:['',Validators.required],
      hdescripcion:['',Validators.required],
      himagen:['',Validators.required],
      hcodigo:['']
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.curso.id_curso = this.form.value.hcodigo;
      this.curso.nombre = this.form.value.hnombre;
      this.curso.categoria = this.form.value.hcategoria;
      this.curso.descripcion = this.form.value.hdescripcion;
      this.curso.imagen = this.form.value.himagen;

      if (this.edicion) {
        this.cS.update(this.curso).subscribe({
          next: () => {
            this.cS.list().subscribe((d) => {
              this.cS.setList(d);
            });
            this.router.navigate(['cursoadmin']);
          },
          error: (err) => {
            if (err.error?.message === 'El curso ya existe') {
              this.snackBar.open('El nombre del curso ya fue ingresado.', 'Cerrar', {
                duration: 3000,
              });
            } else {
              this.snackBar.open('Ocurrió un error inesperado.', 'Cerrar', {
                duration: 3000,
              });
            }
          },
        });
      } else {
        this.cS.insert(this.curso).subscribe({
          next: () => {
            this.cS.list().subscribe((d) => {
              this.cS.setList(d);
            });
            this.router.navigate(['cursoadmin']);
          },
          error: (err) => {
            if (err.error?.message === 'El curso ya existe') {
              this.snackBar.open('El nombre del curso ya fue ingresado.', 'Cerrar', {
                duration: 3000,
              });
            } else {
              this.snackBar.open('El nombre del curso ya fue ingresado', 'Cerrar', {
                duration: 3000,
              });
            }
          },
        });
      }
    }
  }
  init(){
    if(this.edicion){
      this.cS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          hcodigo:new FormControl(data.id_curso),
          hnombre:new FormControl(data.nombre),
          hcategoria:new FormControl(data.categoria),
          hdescripcion: new FormControl(data.descripcion)  ,
          himagen:new FormControl(data.imagen)    
        })
      })
    }
  }
}
