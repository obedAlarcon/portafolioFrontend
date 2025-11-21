import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/footer/footer.component';
import NavbarComponent from "../../shared/navbar/navbar.component";
import { filter } from 'rxjs';


@Component({
    selector: 'app-portafolio',
    imports: [RouterOutlet, RouterModule, FooterComponent, NavbarComponent],
    templateUrl: './portafolio.component.html',
    styleUrl: './portafolio.component.css'
})
export class PortafolioComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd) // Filtramos solo eventos de fin de navegación
    ).subscribe(() => {
      // Hacemos un scroll suave al inicio
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Hacemos un scroll suave al inicio de la página
        });
      }, 100); // Retardo pequeño para asegurar que la vista cargue correctamente
    });

    // Escuchamos para un ancla (por ejemplo, #contacto)

  }

  scrollToAnchor(): void {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Desliza suave hacia el ancla
      }
    }
  }
}
