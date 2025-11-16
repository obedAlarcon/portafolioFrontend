import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-forgot-password',
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
email = '';
message = '';

constructor(private http: HttpClient) {}

submit() {
 this.http.post<any>('http://localhost:5000/api/v1/auth/recovery', { email: this.email })
  .subscribe({
    next: (res) => {
    
      this.message = res.message ||'se envio un correo de recuperacion';
    },
    error: (err) => {
      this.message = err.error?.message || 'Hubo un error al procesar la solicitud.';
    }
  });

}

}
