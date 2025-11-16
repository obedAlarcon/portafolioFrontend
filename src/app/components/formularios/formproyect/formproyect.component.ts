import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2'; // ✅ Importar SweetAlert2

import { ProyectService } from '../../../services/proyect.service';

@Component({
  selector: 'app-formproyect',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule, 
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule],
  templateUrl: './formproyect.component.html',
  styleUrls: ['./formproyect.component.css'] // ✅ Corregido: styleUrl → styleUrls
})
export default class FormproyectComponent implements OnInit {

  formulario!: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;
  fileName: string | null = null;
  imageError: string | null = null;
  selectedFile: File | null = null;
  crearProyecto: boolean = true; // ✅ Switch para resetear después de enviar
  router: any;

  constructor(
    private fb: FormBuilder,
    private proyectService: ProyectService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      backend: ['', Validators.required],
      frontend: ['', Validators.required],
      librarys: ['', Validators.required],
      urlgit:['',Validators.required]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.imageError = null;

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        this.imageError = 'Solo se permiten archivos de tipo imagen (JPG, JPEG, PNG).';
        this.selectedImage = null;
        this.selectedFile = null;
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        this.imageError = 'El archivo es demasiado grande. El tamaño máximo permitido es 2MB.';
        this.selectedImage = null;
        this.selectedFile = null;
        return;
      }

      this.fileName = file.name;
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  enviar(): void {
    if (!this.formulario.valid || !this.selectedFile) {
      this.formulario.markAllAsTouched();
      this.imageError = 'Por favor selecciona una imagen válida.';
      this.cdr.detectChanges();
      return;
    }

    const formData = new FormData();
    formData.append('name', this.formulario.get('name')?.value);
    formData.append('backend', this.formulario.get('backend')?.value);
    formData.append('frontend', this.formulario.get('frontend')?.value);
    formData.append('librarys', this.formulario.get('librarys')?.value);
    formData.append('urlgit', this.formulario.get('urlgit')?.value);
    formData.append('image', this.selectedFile, this.selectedFile.name);

    this.proyectService.addProyect(formData).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: '¡Proyecto creado!',
          text: 'Tu proyecto ha sido guardado exitosamente.',
          confirmButtonColor: '#facc15', // amarillo
          background: '#1f2937',         // gris oscuro (tailwind gray-800)
          color: 'white',
           timer: 2000,
           showConfirmButton: false
              }).then(() => {
                 this.router.navigate(['/']);    
        });

        if (this.crearProyecto) {
          this.formulario.reset();
          this.selectedFile = null;
          this.selectedImage = null;
          this.fileName = null;
          this.imageError = null;
          this.cdr.detectChanges();
        }
      },
      error: (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el proyecto',
          text: error.status === 0
            ? 'No se pudo conectar al servidor.'
            : `Hubo un error: ${error.message}`,
          confirmButtonColor: '#ef4444', // rojo
          background: '#1f2937',
          color: 'white'
        });
      }
    });
  }
}
