import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cuestionario_academico } from '../models/Cuestionario_academico';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CuestionarioAcademicoService {
  private url=`${base_url}/cuestionarios`

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Cuestionario_academico[]>(this.url)
  }
}