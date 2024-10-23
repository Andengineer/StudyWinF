import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Canje } from '../models/Canje';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CanjeService {
  private url=`${base_url}/canje`
  private listaCambio= new Subject<Canje[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Canje[]>(this.url)
  }
  insert(ro:Canje){
    return this.http.post(this.url,ro)
  }

  setList(listaNueva:Canje[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
}
