import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TipoRecompensa } from '../../../models/TipoRecompensa';
import { TipoDeRecompensaService } from '../../../services/tipo-de-recompensa.service';

@Component({
  selector: 'app-creaeditatiporecompensa',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatFormFieldModule,MatSelectModule,MatButtonModule,MatIconModule,ReactiveFormsModule,CommonModule],
  templateUrl: './creaeditatiporecompensa.component.html',
  styleUrl: './creaeditatiporecompensa.component.css'
})
export class CreaeditatiporecompensaComponent implements OnInit{
  form:FormGroup=new FormGroup({});
  tiporecompensa:TipoRecompensa=new TipoRecompensa()
  id:number=0;
  edicion:boolean=false

  constructor(private trS:TipoDeRecompensaService, private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null
      //captura data que viene de la lista |^|
      this.init()
    })
    this.form=this.formBuilder.group({
      htipo:['',Validators.required],
      hcodigo:[''] 
    });
  }

  aceptar(){
    if(this.form.valid){
      this.tiporecompensa.idTipoRecompensa=this.form.value.hcodigo;
      this.tiporecompensa.tipo=this.form.value.htipo;
      
      if(this.edicion){
        this.trS.update(this.tiporecompensa).subscribe(d=>{
          this.trS.list().subscribe(d=>{
            this.trS.setList(d)
          })
        })
      }else{
        this.trS.insert(this.tiporecompensa).subscribe(d=>{
          this.trS.list().subscribe(d=>{
            this.trS.setList(d)
          });
        });
      }
      this.router.navigate(['tiporecompensaadmin'])
    }
  }

  init(){
    if(this.edicion){
      this.trS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          hcodigo:new FormControl(data.idTipoRecompensa),
          htipo:new FormControl(data.tipo)
        })
      })
    }
  }
}
