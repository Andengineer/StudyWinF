import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cuestionario_academico } from '../models/Cuestionario_academico';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CuestionarioAcademicoService {
  private url=`${base_url}/cuestionarios`
  private listaCambio= new Subject<Cuestionario_academico[]>();

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Cuestionario_academico[]>(this.url)
  }
  insert(ca:Cuestionario_academico){
    return this.http.post(this.url,ca)
  }
  setList(listaNueva:Cuestionario_academico[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Cuestionario_academico>(`${this.url}/${id}`)
  }
  update(r:Cuestionario_academico){
    return this.http.put(this.url,r)
  }
}