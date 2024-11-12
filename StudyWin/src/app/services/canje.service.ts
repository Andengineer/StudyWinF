import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Canje } from '../models/Canje';
import { Observable, Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CanjeService {
  private url=`${base_url}/canje`
  private listaCambio= new Subject<Canje[]>();
  identcanje:number=0
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Canje[]>(this.url)
  }
  insert(ro:Canje): Observable<Canje>{
    return this.http.post<Canje>(this.url,ro)
  }

  setList(listaNueva:Canje[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Canje>(`${this.url}/${id}`)
  }
  update(r:Canje){
    return this.http.put(this.url,r)
  }
  setIdcanje(value:number){
    this.identcanje=value
    return console.log(this.getIdcanje())
  }
  getIdcanje(){
    return this.identcanje
  }
}
