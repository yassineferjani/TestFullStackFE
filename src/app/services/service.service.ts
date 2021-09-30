import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  host:String = "http://127.0.0.1:8000/"

  constructor(private http: HttpClient) { }

  sendJson(json:any):Observable<object>{
   return this.http.post(this.host+"json/",json)
  }
}
