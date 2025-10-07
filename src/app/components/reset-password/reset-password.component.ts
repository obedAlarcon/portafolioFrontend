import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
   password = '';
  confirmPassword = '';
  token: string | null = null;
  message = '';
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('TOKEN:', this.token);
    });
  }

  submit() {
    if (!this.password || !this.confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos obligatorios',
        text: 'Todos los campos son obligatorios.'
      });
      return;
    }

    if (this.password !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas diferentes',
        text: 'Las contraseñas no coinciden.'
      });
      return;
    }

    if (!this.token) {
      Swal.fire({
        icon: 'error',
        title: 'Token inválido',
        text: 'Token inválido o ausente.'
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Vas a cambiar tu contraseña.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.loading = true;

        this.http.post('http://localhost:5000/api/v1/auth/change-password', {
          token: this.token,
          newPassword: this.password
        }).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Contraseña actualizada',
              text: 'Redirigiendo al login...',
              timer: 1500,
              showConfirmButton: false
            }).then(() => {
              this.router.navigate(['/login']);
            });
          },
          error: (err) => {
            this.loading = false;
            const msg = err.error?.message || 'Error al actualizar la contraseña.';
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: msg
            });
          }
        });
      }
    });
  }
}
