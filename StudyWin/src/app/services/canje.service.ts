import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Canje } from '../models/Canje';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CanjeService {
  private url=`${base_url}/canje`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Canje[]>(this.url)
  }
}
