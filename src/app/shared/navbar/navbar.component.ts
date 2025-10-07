import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export default class NavbarComponent implements OnInit {
  
  menuAbierto = false;
  isDesktopView = false;

  @ViewChild('menu') menuRef!: ElementRef;
  @ViewChild('menuButton') menuButtonRef!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.checkIfDesktop();
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  @HostListener('window:resize')
  onResize() {
    this.checkIfDesktop();
  }

  checkIfDesktop() {
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktopView = window.innerWidth >= 768;
      this.menuAbierto = this.isDesktopView;
    }
  }

  // Cierra el menú si se hace clic fuera de él o del botón
  @HostListener('document:click', ['$event'])
  onClickFuera(event: MouseEvent) {
    if (
      this.menuAbierto &&
      !this.isDesktopView &&
      this.menuRef &&
      !this.menuRef.nativeElement.contains(event.target) &&
      !this.menuButtonRef.nativeElement.contains(event.target)
    ) {
      this.menuAbierto = false;
    }
  }
}
