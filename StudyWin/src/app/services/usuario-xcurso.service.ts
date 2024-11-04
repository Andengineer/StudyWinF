import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioXCurso } from '../models/UsuarioXCurso';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class UsuarioXCursoService {
  private url=`${base_url}/usuariosxcurso`
  private listaCambio= new Subject<UsuarioXCurso[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<UsuarioXCurso[]>(this.url)
  }
  insert(ro:UsuarioXCurso){
    return this.http.post(this.url,ro)
  }

  setList(listaNueva:UsuarioXCurso[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<UsuarioXCurso>(`${this.url}/${id}`)
  }
  update(r:UsuarioXCurso){
    return this.http.put(this.url,r)
  }
}
