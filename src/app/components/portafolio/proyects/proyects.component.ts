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
 proyects: any[] = [];

  modalAbierto = false;
  proyectoSeleccionado: any = null;

  constructor(
    private proyectService: ProyectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos() {
    this.proyectService.getProyects().subscribe({
      next: (data) => this.proyects = data,
      error: (err) => console.error('Error cargando proyectos:', err)
    });
  }

  // 👉 BOTÓN CREAR PROYECTO → LOGIN
  irCrearProyecto() {
    this.router.navigate(['/login']);
  }

  // 👉 ABRIR MODAL
  abrirModal(proyecto: any) {
    this.proyectoSeleccionado = proyecto;
    this.modalAbierto = true;
  }

  // 👉 CERRAR MODAL
  cerrarModal() {
    this.modalAbierto = false;
    this.proyectoSeleccionado = null;
  }

  // 👉 ELIMINAR PROYECTO
  eliminar(id: number) {
    const conf = confirm('¿Seguro que deseas eliminar este proyecto?');
    if (!conf) return;

    this.proyectService.deleteProyect(id).subscribe({
      next: () => {
        alert('Proyecto eliminado');
        this.cerrarModal();
        this.cargarProyectos();
      },
      error: (err) => {
        console.error('Error al eliminar proyecto:', err);

        if (err.status === 401) {
          alert('Debes iniciar sesión');
          this.router.navigate(['/login']);
        }
      }
    });
  }

}
