import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { DetalleXCanje } from '../models/DetalleXCanje';
import { HttpClient } from '@angular/common/http';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class DetallexcanjeService {
  private url=`${base_url}/detalle_canje`
  private listaCambio= new Subject<DetalleXCanje[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<DetalleXCanje[]>(this.url)
  }
  insert(ro:DetalleXCanje){
    return this.http.post(this.url,ro)
  }

  setList(listaNueva:DetalleXCanje[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  listId(id:number){
    return this.http.get<DetalleXCanje>(`${this.url}/${id}`)
  }
  update(r:DetalleXCanje){
    return this.http.put(this.url,r)
  }
}
