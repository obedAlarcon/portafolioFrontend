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
      name: "Portafolio Personal",
      image: "PORTAFOLIO.jpg",
      backend: "Node.js, Express, Postgres",
      frontend: "Angular 20, TypeScript, RxJS",
      librarys: "JWT, postgres, Tailwind CSS",
      urlgit: "https://github.com/obedAlarcon/portafolioFrontend.git"
    },
    {
      id: 2,
      name: "Control de dispositivos",
      image: "SUNTIC.jpg",
      backend: "node.js, postgres, express",
      frontend: "Angular 20, SCSS, NgRx",
      librarys: "boom, Tailwind,Jwt",
      urlgit: "https://github.com/obedAlarcon/suntic.git"
    },
    {
      id: 3,
      name: "Sistema de inventario",
      image: "MOTUL.jpg",
      backend: "mysql, php",
      frontend: "Plantilla adminLte",
      librarys: "date picker,jQuery, ajax",
      urlgit: "https://github.com/obedAlarcon/motull.git"
    }
  ];

  modalAbierto = false;
  proyectoSeleccionado: any;

  constructor() { }

  ngOnInit(): void {
  }

  // FUNCIÓN QUE FALTABA - AÑADE ESTA FUNCIÓN
  getImagePath(imageName: string): string {
    // Elige una de estas opciones:
    
    // Opción 1: Si tus imágenes están en assets (RECOMENDADO)
    return `public/img/proyects/${imageName}`;
    
    // Opción 2: Si tus imágenes están en public
    // return `src/public/img/proyects/${imageName}`;
    
    // Opción 3: Si prefieres ruta relativa desde public
    // return `img/proyects/${imageName}`;
  }

  abrirModal(proyecto: any): void {
    this.proyectoSeleccionado = proyecto;
    this.modalAbierto = true;
    document.body.style.overflow = 'hidden';
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.proyectoSeleccionado = null;
    document.body.style.overflow = 'auto';
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este proyecto?')) {
      this.proyects = this.proyects.filter(p => p.id !== id);
      this.cerrarModal();
      console.log('Proyecto eliminado:', id);
    }
  }

  irCrearProyecto(): void {
    console.log('Navegar a crear proyecto');
    // this.router.navigate(['/crear-proyecto']);
  }
}
