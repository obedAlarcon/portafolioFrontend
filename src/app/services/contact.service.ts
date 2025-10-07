import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
private url= environment.API_URL
  constructor(private http:HttpClient) { }

  
  sendMessage(nombre: string, email: string, mensaje: string): Observable<any> {
    return this.http.post(`${this.url}/api/v1/contact`, { nombre, email, mensaje });
  }
}
