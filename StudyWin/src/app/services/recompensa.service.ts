import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Recompensa } from '../models/Recompensa';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class RecompensaService {
  private url=`${base_url}/recompensas`
  
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Recompensa[]>(this.url)
  }
}
