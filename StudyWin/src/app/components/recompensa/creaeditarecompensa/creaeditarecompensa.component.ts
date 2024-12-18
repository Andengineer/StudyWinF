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
import { Recompensa } from '../../../models/Recompensa';
import { RecompensaService } from '../../../services/recompensa.service';
import { Asociado } from '../../../models/Asociado';
import { TipoRecompensa } from '../../../models/TipoRecompensa';
import { AsociadoService } from '../../../services/asociado.service';
import { TipoDeRecompensaService } from '../../../services/tipo-de-recompensa.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditarecompensa',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatFormFieldModule,MatSelectModule,MatButtonModule,MatIconModule,ReactiveFormsModule,CommonModule,MatDatepickerModule],
  templateUrl: './creaeditarecompensa.component.html',
  styleUrl: './creaeditarecompensa.component.css'
})
export class CreaeditarecompensaComponent {
  form:FormGroup=new FormGroup({});
  recompensa:Recompensa=new Recompensa()
  id:number=0;
  edicion:boolean=false
  listaAsociados:Asociado[]=[];
  listaTipos:TipoRecompensa[]=[];

  constructor(private rS:RecompensaService, private aS:AsociadoService, private trS:TipoDeRecompensaService, private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute, private snackBar: MatSnackBar){}

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
      hpuntos: ['', Validators.required],
      hstock: ['', Validators.required],
      hasociado:['',Validators.required],
      htipo:['',Validators.required],
      himagen:['',Validators.required],
      hcodigo:[''] 
    });
    //para la lista foranea de asociados
    this.aS.list().subscribe(data=>{
      this.listaAsociados=data
    })
    //para la lista foranea de tipos de recompensas
    this.trS.list().subscribe(data=>{
      this.listaTipos=data
    })
  }

  aceptar() {
    const puntos = this.form.value.hpuntos;
    const stock = this.form.value.hstock;
  
    if (puntos < 0) {
      this.snackBar.open('No se puede ingresar números negativos en los puntos', 'Cerrar', {
        duration: 3000,
      });
      return;
    }
  
    if (stock < 0) {
      this.snackBar.open('No se puede ingresar números negativos en el stock', 'Cerrar', {
        duration: 3000,
      });
      return;
    }
  
    if (this.form.valid) {
      this.recompensa.id_recompensa = this.form.value.hcodigo;
      this.recompensa.nombre = this.form.value.hnombre;
      this.recompensa.descripcion = this.form.value.hdescripcion;
      this.recompensa.puntos = this.form.value.hpuntos;
      this.recompensa.stock = this.form.value.hstock;
      this.recompensa.asociado.id_asociado = this.form.value.hasociado;
      this.recompensa.tipo_recompensa.idTipoRecompensa = this.form.value.htipo;
      this.recompensa.imagen = this.form.value.himagen;
  
      if (this.edicion) {
        this.rS.update(this.recompensa).subscribe({
          next: () => {
            this.rS.list().subscribe(d => {
              this.rS.setList(d);
            });
            this.router.navigate(['recompensaadmin']);
          },
          error: (err) => {
            this.handleBackendError(err);
          }
        });
      } else {
        this.rS.insert(this.recompensa).subscribe({
          next: () => {
            this.rS.list().subscribe(d => {
              this.rS.setList(d);
            });
            this.router.navigate(['recompensaadmin']);
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
      // Mostrar mensaje del backend en el snackBar
      this.snackBar.open(err.error.message, 'Cerrar', {
        duration: 3000,
      });
    } else {
      // Mensaje genérico para errores desconocidos
      this.snackBar.open('El nombre de la recompensa ya fue utilizada', 'Cerrar', {
        duration: 3000,
      });
    }
  }
  

  init(){
    if(this.edicion){
      this.rS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          hcodigo:new FormControl(data.id_recompensa),
          hnombre:new FormControl(data.nombre),
          hdescripcion:new FormControl(data.descripcion),
          hpuntos: new FormControl(data.puntos)  ,
          hstock:new FormControl(data.stock),
          hasociado:new FormControl(data.asociado.id_asociado),
          htipo:new FormControl(data.tipo_recompensa.idTipoRecompensa),
          himagen:new FormControl(data.imagen)
        })
      })
    }
  }
}
