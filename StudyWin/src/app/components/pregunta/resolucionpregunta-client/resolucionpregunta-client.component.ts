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
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/Usuario';
import { Role } from '../../../models/Role';
import { RolService } from '../../../services/rol.service';

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
  rptaingresada:string=""
  respuestaCorrecta: boolean | null = null; 
  usuario:Usuario=new Usuario()
  rols:string='CLIENT'
  rola:Role=new Role()
  role:string=''
  

  constructor(
    private pS: PreguntaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ls:LoginService,
    private uS:UsuarioService,
    private rolS:RolService
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
      this.router.navigate(['/pregunta']); // Vuelve a la lista de preguntas después de enviar
    }
  }

  responder(value: number): void {
    this.rptaingresada = this.form.value.hrespuesta;
  
    // Compara la respuesta ingresada con la respuesta correcta de la pregunta
    if (this.rptaingresada.trim().toLowerCase() === this.pregunta.respuesta.trim().toLowerCase()) {
      this.respuestaCorrecta = true; // La respuesta es correcta
      console.log('Respuesta correcta');
    } else {
      this.respuestaCorrecta = false; // La respuesta es incorrecta
      console.log('Respuesta incorrecta');
    }
  
    // Si la respuesta es correcta, actualiza los puntos del usuario
    if (this.respuestaCorrecta) {
      // Obtén los datos del usuario actual
      this.uS.listId(this.ls.getId()).subscribe(data => {
        this.usuario = data;
  
        // Actualiza solo los puntos del usuario
        const usuarioUpdate = { ...this.usuario }; // Hacemos una copia del usuario
        usuarioUpdate.puntos_usuario += value;     // Incrementamos los puntos
  
        // Asegura que la contraseña permanezca intacta
        usuarioUpdate.contrasena = this.usuario.contrasena;
  
        // Realiza la actualización del usuario sin modificar otros datos sensibles
        this.uS.update(usuarioUpdate).subscribe(() => {
          console.log('Usuario actualizado con puntos.');
  
          // Luego inserta o actualiza el rol si es necesario
          this.rola.rol = this.rols;
          this.rola.user = this.usuario;
          
          this.rolS.insert(this.rola).subscribe(() => {
            console.log('Rol actualizado correctamente.');
          });
        });
      });
    }
  }
  
}
