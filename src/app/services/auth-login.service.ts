
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
   private url=environment.API_URL
  constructor(private http:HttpClient,@Inject(PLATFORM_ID) private platformId: Object) { }


  login(email: string, password: string, role: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password, role };
  
    return this.http.post<{ token: string }>(
      `${this.url}/api/v1/auth/login`,
      body,
      { headers }
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
