import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterModule, RouterOutlet } from '@angular/router';

import { Proyect } from '../../../models/proyect.model';
import { ProyectService } from '../../../services/proyect.service';
import { error } from 'console';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
    selector: 'app-proyects',
    imports: [CommonModule, RouterModule,ReactiveFormsModule],
    templateUrl: './proyects.component.html',
    styleUrl: './proyects.component.css'
})
export default class ProyectsComponent implements OnInit {
 proyect: Proyect[] = [];
  proyectoSeleccionado: any;
  modalVisible = false;
  
  // Variables para el modal de agregar proyecto
  addModalVisible = false;
  proyectForm: FormGroup;
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private proyectService: ProyectService,
    private fb: FormBuilder
  ) {
    // Inicializar el formulario
    this.proyectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      technologies: ['', [Validators.required]],
      githubUrl: [''],
      demoUrl: ['']
    });
  }

  ngOnInit(): void {
    this.getProyect();
  }

  getProyect() {
    this.proyectService.getProyects()
    .subscribe({
      next: (data) => {
        this.proyect = data;
        console.log('Datos de los proyectos:', data);
      },
      error: (error) => {
        console.error('Error al obtener los proyectos:', error);
      }
    });
  }

  // Método para abrir modal de agregar proyecto
  abrirAddModal() {
    this.addModalVisible = true;
  }

  // Método para cerrar modal de agregar proyecto
  cerrarAddModal() {
    this.addModalVisible = false;
    this.proyectForm.reset();
    this.selectedImage = null;
    this.imagePreview = null;
  }

  // Método para manejar la selección de imagen
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // MÉTODO ADD PROYECT - CORREGIDO
  addProyect() {
    if (this.proyectForm.invalid) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    if (!this.selectedImage) {
      alert('Por favor selecciona una imagen');
      return;
    }

    const formData = new FormData();
    
    // Agregar la imagen
    formData.append('image', this.selectedImage);
    
    // Agregar todos los campos del formulario
    formData.append('name', this.proyectForm.value.name);
    formData.append('description', this.proyectForm.value.description);
    formData.append('technologies', this.proyectForm.value.technologies);
    formData.append('githubUrl', this.proyectForm.value.githubUrl || '');
    formData.append('demoUrl', this.proyectForm.value.demoUrl || '');

    console.log('Enviando proyecto...');

    this.proyectService.addProyect(formData).subscribe({
      next: (response) => {
        console.log('✅ Proyecto creado:', response);
        alert('Proyecto creado exitosamente');
        
        // Cerrar modal y resetear formulario
        this.cerrarAddModal();
        
        // Recargar la lista de proyectos
        this.getProyect();
      },
      error: (error) => {
        console.error('❌ Error al crear proyecto:', error);
        alert('Error al crear el proyecto: ' + (error.error?.message || error.message));
      }
    });
  }

  abrirModal(item: Proyect) {
    this.proyectoSeleccionado = item;
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.proyectoSeleccionado = null;
  }

  deleteProyect(proyecto: Proyect) {
    if (!proyecto) return;

    const confirmar = confirm(`¿Seguro que deseas eliminar el proyecto "${proyecto.name}"?`);
    if (!confirmar) return;

    this.proyectService.deleteProyect(proyecto.id).subscribe({
      next: () => {
        this.proyect = this.proyect.filter(p => p.id !== proyecto.id);
        this.cerrarModal();
        alert('Proyecto eliminado correctamente.');
      },
      error: (err) => {
        console.error('Error al eliminar el proyecto:', err);
        alert('Hubo un error al eliminar el proyecto.');
      }
    });
  }


}
