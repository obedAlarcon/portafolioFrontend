import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLoginService } from '../../services/auth-login.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export   class LoginComponent {
  
loginForm:FormGroup
  
constructor(private fb:FormBuilder,
  private authLoginService:AuthLoginService,
  private router: Router 

){
  
  this.loginForm=fb.group({
    email: ['', [Validators.required, Validators.email]],
    password:['',Validators.required],
    
  })

}
login(){
  const {email,password}=this.loginForm.value;
  const role = 'admin';
  this.authLoginService.login(email,password,role).subscribe({
    next: (res)=>{
      this.authLoginService.saveToken(res.token);
      this.router.navigate(['/admin/formproyect'])
      console.log(email,password)
    },
    error:()=>{
      alert('Credenciales Incorrectas ')
    }
  })
}

irARecovery(){
  this.router.navigate(['/forgot-password']);
}
}
