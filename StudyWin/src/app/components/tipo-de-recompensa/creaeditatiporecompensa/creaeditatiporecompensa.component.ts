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
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private trS:TipoDeRecompensaService, private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute, private snackBar:MatSnackBar){}

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

  aceptar() {
    if (this.form.valid) {
      this.tiporecompensa.idTipoRecompensa = this.form.value.hcodigo;
      this.tiporecompensa.tipo = this.form.value.htipo;
  
      if (this.edicion) {
        this.trS.update(this.tiporecompensa).subscribe({
          next: () => {
            this.trS.list().subscribe(d => {
              this.trS.setList(d);
            });
            this.router.navigate(['tiporecompensaadmin']);
          },
          error: (err) => {
            this.handleBackendError(err);
          }
        });
      } else {
        this.trS.insert(this.tiporecompensa).subscribe({
          next: () => {
            this.trS.list().subscribe(d => {
              this.trS.setList(d);
            });
            this.router.navigate(['tiporecompensaadmin']);
          },
          error: (err) => {
            this.handleBackendError(err);
          }
        });
      }
    }
  }
  handleBackendError(err: any) {
    if (err.error && err.error.message) {
      // Mensaje personalizado desde el backend
      this.snackBar.open(err.error.message, 'Cerrar', {
        duration: 3000,
      });
    } else {
      // Mensaje genérico para errores no identificados
      this.snackBar.open('El nombre de la recompensa ya fue utilizada', 'Cerrar', {
        duration: 3000,
      });
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
