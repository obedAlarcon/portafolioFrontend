import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2'
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'] 
})
export default class ContactComponent {
  contactForm!: FormGroup;

  loading = false;

  constructor(private fb: FormBuilder, private contactService:ContactService) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.loading = true;
  this.contactService.sendMessage(
  this.contactForm.value.name,
  this.contactForm.value.email,
  this.contactForm.value.message
).subscribe({
  next: () => {
    Swal.fire({
        icon: 'success',
        title: 'Mensaje enviado ',
        text: 'Tu mensaje fue enviado correctamente.',
        confirmButtonColor: '#10b981', // verde
        background: '#1f2937',         // gris oscuro
        color: 'white'
      });
      this.contactForm.reset();
      this.loading = false;
    
  },
  error: (err: any) => {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Error al enviar',
      text: 'No se pudo enviar el mensaje. Intenta de nuevo.',
      confirmButtonColor: '#ef4444',
      background: '#1f2937',
      color: 'white'
    });
    this.loading = false;
  }
});

    
  }
}
