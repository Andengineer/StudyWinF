import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'app-creaeditausuario',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatFormFieldModule,MatSelectModule,MatButtonModule,MatIconModule,ReactiveFormsModule],
  templateUrl: './creaeditausuario.component.html',
  styleUrl: './creaeditausuario.component.css'
})
export class CreaeditausuarioComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  usuario:Usuario=new Usuario();
  hidePassword = true;
  listaInstituciones:{ value:string, viewValue:string}[]=[
    {value:'Universidad Peruana de Ciencias Aplicadas',viewValue:'Universidad Peruana de Ciencias Aplicadas'},
    { value: 'Universidad Peruana de Ciencias Aplicadas', viewValue: 'Universidad Peruana de Ciencias Aplicadas' },
    { value: 'Pontificia Universidad Católica del Perú', viewValue: 'Pontificia Universidad Católica del Perú' },
    { value: 'Universidad Nacional Mayor de San Marcos', viewValue: 'Universidad Nacional Mayor de San Marcos' },
    { value: 'Universidad de Lima', viewValue: 'Universidad de Lima' },
    { value: 'Universidad Nacional de Ingeniería', viewValue: 'Universidad Nacional de Ingeniería' },
    { value: 'Universidad ESAN', viewValue: 'Universidad ESAN' },
    { value: 'Universidad del Pacífico', viewValue: 'Universidad del Pacífico' },
    { value: 'Universidad San Ignacio de Loyola', viewValue: 'Universidad San Ignacio de Loyola' }
  ];
constructor(private uS:UsuarioService, private formBuilder:FormBuilder,private router:Router){}
  ngOnInit(): void {
      this.form=this.formBuilder.group({
        hnombre:['',Validators.required],
        hapellidos:['',Validators.required],
        hinstitucion:['',Validators.required],
        hdni:['',Validators.required],
        hemail:['',Validators.required],
        hpassword:['',Validators.required]
      })
  }
  aceptar(){
    if(this.form.valid){
      this.usuario.nombres=this.form.value.hnombre;
      this.usuario.apellidos=this.form.value.hapellidos;
      this.usuario.institucion_educativa=this.form.value.hinstitucion;
      this.usuario.dni=this.form.value.hdni;
      this.usuario.email=this.form.value.hemail;
      this.usuario.contrasena=this.form.value.hpassword;
      this.usuario.puntos_usuario=0;
      this.usuario.enabled=true;

      this.uS.insert(this.usuario).subscribe(d=>{
        this.uS.list().subscribe(d=>{
          this.uS.setList(d)
        })
      })
    }
    this.router.navigate(['usuario'])
  }
}
