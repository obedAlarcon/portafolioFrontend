import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthRecoveryService {

 
    private url = environment.API_URL;

  constructor(private http: HttpClient) {}

  recoverPassword(email: string) {
    return this.http.post(`${this.url}/api/v1/auth/recovery`, { email });
  }

  changePassword(token: string, newPassword: string) {
    return this.http.post(`${this.url}/api/v1/auth/change-password`, { token, newPassword });
  }
  
}
