import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PreguntaService } from '../../../services/pregunta.service';
import { Pregunta } from '../../../models/Pregunta';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-resolucionpregunta-client',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './resolucionpregunta-client.component.html',
  styleUrls: ['./resolucionpregunta-client.component.css']
})
export class ResolucionpreguntaClientComponent implements OnInit {
  form: FormGroup=new FormGroup({});
  dataSource:MatTableDataSource<Pregunta>=new MatTableDataSource()
  pregunta:Pregunta=new Pregunta()

  constructor(
    private pS: PreguntaService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Inicializamos el formulario con solo el campo de respuesta
    this.form = this.formBuilder.group({
      hrespuesta: ['', Validators.required]
    });

    // Obtiene el ID de la pregunta desde el servicio y carga sus detalles
    const preguntaId = this.pS.getIdpregunta();
    this.cargarPregunta(preguntaId);
  }

  cargarPregunta(id: number): void {
    this.pS.listId(id).subscribe((data) => {
      this.pregunta = data; // Asigna los datos de la pregunta obtenida a la variable pregunta
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      console.log('Respuesta enviada:', this.form.value.hrespuesta);
      this.router.navigate(['/preguntas']); // Vuelve a la lista de preguntas después de enviar
    }
  }
}
