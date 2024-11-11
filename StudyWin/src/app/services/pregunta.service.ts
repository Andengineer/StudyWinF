import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pregunta } from '../models/Pregunta';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private url=`${base_url}/pregunta`
  private listaCambio= new Subject<Pregunta[]>();
  identpregunta:number=0

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Pregunta[]>(this.url)
  }
  insert(pr:Pregunta){
    return this.http.post(this.url,pr)
  }
  setList(listaNueva:Pregunta[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Pregunta>(`${this.url}/${id}`)
  }
  update(p:Pregunta){
    return this.http.put(this.url,p)
  }
  setIdpregunta(value:number){
    this.identpregunta=value
    return console.log(this.getIdpregunta())
  }
  getIdpregunta(){
    return this.identpregunta
  }
}
