import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoRecompensa } from '../models/TipoRecompensa';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TipoDeRecompensaService {
  private url=`${base_url}/tipo_recompensas`
  private listaCambio= new Subject<TipoRecompensa[]>();

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<TipoRecompensa[]>(this.url)
  }
  insert(tr:TipoRecompensa){
    return this.http.post(this.url,tr)
  }
  setList(listaNueva:TipoRecompensa[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<TipoRecompensa>(`${this.url}/${id}`)
  }
  update(t:TipoRecompensa){
    return this.http.patch(this.url,t)
  }
}
