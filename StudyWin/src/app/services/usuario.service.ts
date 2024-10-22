import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url=`${base_url}/usuario`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Usuario[]>(this.url)
  }
}
