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
      name: "portafolio",
      image: "PORTAFOLIO.jpg",
      backend: "Node.js, Express, postgres",
      frontend: "Angular 20, TypeScript, RxJS",
      librarys: "JWT, Tailwind CSS",
      urlgit: "https://github.com/obedAlarcon/portafolioFrontend.git"
    },
    {
      id: 2,
      name: "sistema de inventario",
      image: "MOTUL.jpg",
      backend: "mysql, php",
      frontend: "plantilla adminLte",
      librarys: "css, jQuey, ajax",
      urlgit: "https://github.com/obedAlarcon/motull.git"
    },
    {
      id: 3,
      name: "Sistema para dispositivos",
      image: "SUNTIC.png",
      backend: "node.js, express, postgres ",
      frontend: "Angular 20, TypeScript, tailwind",
      librarys: "boom, tailwind, jwt",
      urlgit: "https://github.com/obedAlarcon/suntic.git"
    },
   
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
