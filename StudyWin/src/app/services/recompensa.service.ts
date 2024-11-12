import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Recompensa } from '../models/Recompensa';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class RecompensaService {
  private url=`${base_url}/recompensas`
  private listaCambio= new Subject<Recompensa[]>();
  identrecompensa:number=0
  verificador: boolean | null = null;
  
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Recompensa[]>(this.url)
  }
  insert(re:Recompensa){
    return this.http.post(this.url,re)
  }
  setList(listaNueva:Recompensa[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Recompensa>(`${this.url}/${id}`)
  }
  update(r:Recompensa){
    return this.http.patch(this.url,r)
  }
  setIdrecompensa(value:number){
    this.identrecompensa=value
    return console.log(this.getIdrecompensa())
  }
  getIdrecompensa(){
    return this.identrecompensa
  }
  setBolean(value:boolean){
    this.verificador=value
  }
  getBolean(){
    return this.verificador
  }
}
