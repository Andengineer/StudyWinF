import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from '../../models/jwtRequest';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,FormsModule,MatInputModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  mensaje: string = '';
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  iddelusuario:number=0

  constructor(
    private cS:UsuarioService,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
  }
  login() {
    const request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.loginService.setusername(this.username);
        this.router.navigate(['home']);
        
        // Llama al servicio de usuarios después de un inicio de sesión exitoso
        this.cS.list().subscribe(data => {
          // Filtra los datos solo para el usuario actual
          const filteredData = data.filter((element: Usuario) => element.email === this.username);
          this.dataSource = new MatTableDataSource(filteredData);

          if (this.dataSource.data.length > 0) {
            this.iddelusuario = this.dataSource.data[0].id_usuario;
            this.loginService.setid(this.iddelusuario);
          }

          // Imprime el ID del usuario actual
          console.log(this.loginService.getId());
        });
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';
        this.snackBar.open(this.mensaje, 'Aviso', { duration: 2000 });
      }
    );
  }
}
