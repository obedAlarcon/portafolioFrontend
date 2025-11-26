import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { ProyectService } from '../../../services/proyect.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
    selector: 'app-proyects',
    imports: [CommonModule, RouterModule,ReactiveFormsModule],
    templateUrl: './proyects.component.html',
    styleUrl: './proyects.component.css'
})
export default class ProyectsComponent implements OnInit {
  
  proyects = [
    {
      id: 1,
      name: "E-commerce Platform",
      image: "proyecto1.jpg",
      backend: "Node.js, Express, MongoDB",
      frontend: "Angular 20, TypeScript, RxJS",
      librarys: "JWT, Mongoose, Tailwind CSS",
      urlgit: "https://github.com/tuusuario/ecommerce-platform"
    },
    {
      id: 2,
      name: "Task Management App",
      image: "proyecto2.jpg",
      backend: "Python, Django, PostgreSQL",
      frontend: "Angular 20, SCSS, NgRx",
      librarys: "Django REST, Angular Material, Chart.js",
      urlgit: "https://github.com/tuusuario/task-manager"
    },
    {
      id: 3,
      name: "Social Media Dashboard",
      image: "proyecto3.jpg",
      backend: "Java, Spring Boot, MySQL",
      frontend: "Angular 20, TypeScript, Bootstrap",
      librarys: "Spring Security, Hibernate, RxJS",
      urlgit: "https://github.com/tuusuario/social-dashboard"
    },
    {
      id: 4,
      name: "Weather Application",
      image: "proyecto4.jpg",
      backend: "Node.js, Fastify, Redis",
      frontend: "Angular 20, PWA, Service Workers",
      librarys: "Axios, Chart.js, Leaflet Maps",
      urlgit: "https://github.com/tuusuario/weather-app"
    },
    {
      id: 5,
      name: "Finance Tracker",
      image: "proyecto5.jpg",
      backend: "C# .NET, SQL Server",
      frontend: "Angular 20, TypeScript, PrimeNG",
      librarys: "Entity Framework, Chart.js, NgRx Store",
      urlgit: "https://github.com/tuusuario/finance-tracker"
    },
    {
      id: 6,
      name: "Real Estate Portal",
      image: "proyecto6.jpg",
      backend: "PHP, Laravel, MySQL",
      frontend: "Angular 20, JavaScript, Tailwind",
      librarys: "Eloquent, Google Maps API, File Upload",
      urlgit: "https://github.com/tuusuario/real-estate"
    }
  ];

  modalAbierto = false;
  proyectoSeleccionado: any;

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes cargar datos desde un servicio si es necesario
  }

  abrirModal(proyecto: any): void {
    this.proyectoSeleccionado = proyecto;
    this.modalAbierto = true;
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.proyectoSeleccionado = null;
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      this.proyects = this.proyects.filter(p => p.id !== id);
      this.cerrarModal();
      // Aquí puedes agregar llamada a servicio para eliminar en backend
      console.log('Proyecto eliminado:', id);
    }
  }

  irCrearProyecto(): void {
    // Navegar a la página de crear proyecto
    console.log('Navegar a crear proyecto');
    // this.router.navigate(['/crear-proyecto']);
  }

}
