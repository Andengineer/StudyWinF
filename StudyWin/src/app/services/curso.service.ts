import { Injectable } from '@angular/core';
import { Curso } from '../models/Curso';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CursosXCategoriaDTO } from '../models/CursosXCategoriaDTO';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private url=`${base_url}/curso`
  private titleSubject=new BehaviorSubject<boolean>(true);
  identcurso:number=0
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
  settitle(value: boolean) {
    this.titleSubject.next(value); // Actualiza el estado del título
  }

  gettitle() {
    return this.titleSubject.asObservable(); // Devuelve el Observable para suscribirse
  }
  setIdcurso(value:number){
    this.identcurso=value
    return console.log(this.getIdcurso())
  }
  getIdcurso(){
    return this.identcurso
  }
  getCursosxcategoria():Observable<CursosXCategoriaDTO[]>{
    return this.http.get<CursosXCategoriaDTO[]>(`${this.url}/cursoxcategoria`)
  }
  
}
