import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cuestionario_academico } from '../models/Cuestionario_academico';
import { Observable } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CuestionarioAcademicoService {
  private url=`${base_url}/cuestionarios`

  constructor(private http:HttpClient) { }
  obtenerCuestionariosPorNombreCurso(nombreCurso: string): Observable<Cuestionario_academico[]> {
    const params = new HttpParams().set('nombreCurso', nombreCurso);
    return this.http.get<Cuestionario_academico[]>(`${this.url}/cuestionarioxnombrecurso`, { params });
  }
}