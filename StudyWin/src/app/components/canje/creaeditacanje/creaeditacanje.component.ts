import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Canje } from '../../../models/Canje';
import { CanjeService } from '../../../services/canje.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-creaeditacanje',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatFormFieldModule,MatSelectModule,MatButtonModule,MatIconModule,ReactiveFormsModule],
  templateUrl: './creaeditacanje.component.html',
  styleUrl: './creaeditacanje.component.css'
})
export class CreaeditacanjeComponent {
  form:FormGroup=new FormGroup({});
  canje:Canje=new Canje();
  
  listaUbicaciones:{ value:string, viewValue:string}[]=[
    {value:'Sotano',viewValue:'Sotano'},
    {value:'Piso 1',viewValue:'Piso 1'},
    {value:'Cochera',viewValue:'Cochera'},
    {value:'Terraza',viewValue:'Terraza'}
  ];

  constructor(private rS:CanjeService, private formBuilder:FormBuilder,private router:Router){}
  ngOnInit(): void {
    this.form=this.formBuilder.group({
      hambiente:['',Validators.required],
      hubicacion:['',Validators.required]
    })
}
  aceptar(){
    if(this.form.valid){
      this.canje.Usuario=this.form.value.hambiente;
      this.canje.departamento=this.form.value.hubicacion;
      this.rS.insert(this.canje).subscribe(d=>{
        this.rS.list().subscribe(d=>{
          this.rS.setList(d)
        })
      })
    }
    this.router.navigate(['ambientes'])
  }
}
