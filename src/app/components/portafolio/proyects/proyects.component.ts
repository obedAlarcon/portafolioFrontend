import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterModule, RouterOutlet } from '@angular/router';

import { Proyect } from '../../../models/proyect.model';
import { ProyectService } from '../../../services/proyect.service';
import { error } from 'console';


@Component({
  selector: 'app-proyects',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './proyects.component.html',
  styleUrl: './proyects.component.css'
})
export default class ProyectsComponent implements OnInit {
 proyect:Proyect[]=[]
proyectoSeleccionado: any;
constructor(private proyectService:ProyectService){}
  ngOnInit(): void {
    this.getProyect()
  }
  

getProyect(){
  this.proyectService.getProyects()
  .subscribe({
    next:(data)=>{
     // Verifica que los datos están siendo recibidos correctamente
        this.proyect = data;  // Asigna los datos a la propiedad
        console.log('Datos de los proyectos:', data);
    },
    error:(error)=>{
      console.log('Error al obtener el proyecto')
    }
  })
}
  
modalVisible = false;


abrirModal(item: Proyect) {
  this.proyectoSeleccionado = item;
  this.modalVisible = true;
}

cerrarModal() {
  this.modalVisible = false;
  this.proyectoSeleccionado = null;
}


}
