import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectService {

   
  private url = environment.API_URL;  // URL de la API

  constructor(private http: HttpClient) {}

  // Método para obtener los proyectos
  getProyects(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/proyect/`);
  }

  // Método para agregar un proyecto
  addProyect(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');  // Obtener el token del localStorage

    if (!token) {
      console.error('Token no encontrado');
      // Podrías retornar un error personalizado aquí si prefieres manejar el caso
       // Evita hacer la solicitud si el token no está presente
    }

    // Agregar el token en los encabezados
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,  // Asegúrate de que haya un espacio después de "Bearer"
    });

    // Realizar la solicitud POST con el token en los encabezados
    return this.http.post(`${this.url}/api/v1/proyect/upload/`, formData, { headers });
  }

  // Método para formatear la imagen (si es necesario en otro caso)
  formatImage(image: string): string[] {
    return image ? image.split(',') : [];
  }
}
