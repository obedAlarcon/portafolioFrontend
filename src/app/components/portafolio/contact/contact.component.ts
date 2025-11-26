import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [RouterModule, CommonModule, ReactiveFormsModule],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export default class ContactComponent {
  contactForm!: FormGroup;
  loading = false;

  // Configura tus datos de EmailJS
  private serviceID = 'service_0g2xhgk';
  private templateID = 'template_dnax23l';
  private publicKey = '2d41d77wFsJMmXo2U';
  // Plantilla de respuesta automática al usuario (crea otra en EmailJS)
  private templateIDUser = 'template_autoreply';

  constructor(private fb: FormBuilder) {}

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

    const templateParams = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message,
      time: new Date().toLocaleString()
    };

    // Enviar correo al admin
    emailjs.send(this.serviceID, this.templateID, templateParams, this.publicKey)
      .then(() => {
        // Enviar correo de respuesta automática al usuario
        const templateParamsUser = {
          name: this.contactForm.value.name,
          email: this.contactForm.value.email,
          message: this.contactForm.value.message
        };

        emailjs.send(this.serviceID, this.templateIDUser, templateParamsUser, this.publicKey)
          .then(() => console.log('Correo de respuesta automática enviado al usuario'))
          .catch(err => console.error('Error correo automático:', err));

        Swal.fire({
          icon: 'success',
          title: 'Mensaje enviado',
          text: 'Tu mensaje fue enviado correctamente.',
          confirmButtonColor: '#10b981', // verde
          background: '#1f2937',         // gris oscuro
          color: 'white'
        });

        this.contactForm.reset();
        this.loading = false;
      })
      .catch((err: any) => {
        console.error('Error EmailJS:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar',
          text: 'No se pudo enviar el mensaje. Intenta de nuevo.',
          confirmButtonColor: '#ef4444',
          background: '#1f2937',
          color: 'white'
        });
        this.loading = false;
      });
  }
}
