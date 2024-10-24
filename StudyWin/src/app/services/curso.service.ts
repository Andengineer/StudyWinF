import { Injectable } from '@angular/core';
import { Curso } from '../models/Curso';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private url=`${base_url}/curso`
  private listaCambio= new Subject<Curso[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Curso[]>(this.url)
  }
  insert(ro:Curso){
    return this.http.post(this.url,ro)
  }

  setList(listaNueva:Curso[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<Curso>(`${this.url}/${id}`)
  }
  update(r:Curso){
    return this.http.put(this.url,r)
  }
  
}
