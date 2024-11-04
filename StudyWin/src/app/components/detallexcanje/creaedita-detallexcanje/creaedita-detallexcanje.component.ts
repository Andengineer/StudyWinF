import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DetalleXCanje } from '../../../models/DetalleXCanje';
import { Recompensa } from '../../../models/Recompensa';
import { Canje } from '../../../models/Canje';
import { DetallexcanjeService } from '../../../services/detallexcanje.service';
import { CanjeService } from '../../../services/canje.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecompensaService } from '../../../services/recompensa.service';

@Component({
  selector: 'app-creaedita-detallexcanje',
  standalone: true,
  imports: [FormsModule,MatInputModule, MatFormFieldModule,MatSelectModule,MatButtonModule,MatIconModule,ReactiveFormsModule,CommonModule],
  templateUrl: './creaedita-detallexcanje.component.html',
  styleUrl: './creaedita-detallexcanje.component.css'
})
export class CreaeditaDetallexcanjeComponent {
  form:FormGroup=new FormGroup({});
  detallexcanje:DetalleXCanje=new DetalleXCanje()
  hidePassword = true;
  id:number=0;
  edicion:boolean=false
  listaRecompensas:Recompensa[]=[];
  listaCanjes:Canje[]=[];
  constructor(private rS:RecompensaService,private dxcS:DetallexcanjeService,private cS:CanjeService, private formBuilder:FormBuilder,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null
      //captura data que viene de la lista |^|
      this.init()
    })
    this.form=this.formBuilder.group({
      hcantidad: ['', [Validators.required, Validators.min(0)]],
      hcanje:['',Validators.required],
      hrecompensa:['',Validators.required],
      hcodigo:['']
    });
    //para la lista foranea de usuarios
    this.rS.list().subscribe(data=>{
      this.listaRecompensas=data
    })
    this.cS.list().subscribe(data=>{
      this.listaCanjes=data
    })
  }
  aceptar(){
    if(this.form.valid){
      this.detallexcanje.id_detalle_canje=this.form.value.hcodigo;
      this.detallexcanje.recompensa.id_recompensa=this.form.value.hrecompensa;
      this.detallexcanje.canje.id_canje=this.form.value.hcanje;
      this.detallexcanje.cantidadProductoCanje=this.form.value.hcantidad;
      
      if(this.edicion){
        this.dxcS.update(this.detallexcanje).subscribe(d=>{
          this.dxcS.list().subscribe(d=>{
            this.dxcS.setList(d)
          })
        })
      }else{
        this.dxcS.insert(this.detallexcanje).subscribe(d=>{
          this.dxcS.list().subscribe(d=>{
            this.dxcS.setList(d)
          });
        });
      }
      this.router.navigate(['detalle-canje'])
    }
    
  }
  init(){
    if(this.edicion){
      this.dxcS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          hcodigo:new FormControl(data.id_detalle_canje),
          hrecompensa:new FormControl(data.recompensa.id_recompensa),
          hcanje:new FormControl(data.canje.id_canje),
          hcantidad:new FormControl(data.cantidadProductoCanje),
        })
      })
    }
  }
}
