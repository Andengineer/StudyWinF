import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Asociado } from '../models/Asociado';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class AsociadoService {
  private url=`${base_url}/asociado`
  private listaCambio= new Subject<Asociado[]>();
  identasociado:number=0

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Asociado[]>(this.url)
  }
  insert(as:Asociado){
    return this.http.post(this.url,as)
  }
  setList(listaNueva:Asociado[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Asociado>(`${this.url}/${id}`)
  }
  update(a:Asociado){
    return this.http.put(this.url,a)
  }
  setIdasociado(value:number){
    this.identasociado=value
    return console.log(this.getIdasociado())
  }
  getIdasociado(){
    return this.identasociado
  }
}
