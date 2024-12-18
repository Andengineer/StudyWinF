import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  _username: string = '';
  idUsuario:number=0
  

  setusername(value: string) {
    this._username = value;
  }
  setid(value:number){
    this.idUsuario=value
  }
  getId(){
    return this.idUsuario
  }

  getusername(): string {
    return this._username;
  }

  login(request: JwtRequest) {
    return this.http.post('http://localhost:8080/login', request);
  }
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }
  showUser() {
    let token = sessionStorage.getItem('token');
    if (!token) {
        return '';
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log("Token decodificado:", decodedToken); // Esto mostrará el token completo en la consola
    // Cambia "username" por "nombre" para extraer el nombre correcto
    this._username = decodedToken?.sub || ''; 
    return this._username;
}
}
