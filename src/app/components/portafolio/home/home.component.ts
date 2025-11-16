import { Component } from '@angular/core';

import { RouterModule, RouterOutlet } from '@angular/router';

import SobremiComponent from '../sobremi/sobremi.component';
import SkillsComponent from "../skills/skills.component";
import ProyectsComponent from "../proyects/proyects.component";
import ContactComponent from "../contact/contact.component";


@Component({
    selector: 'app-home',
    imports: [RouterModule, ProyectsComponent, SkillsComponent, ContactComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export default class HomeComponent {

}
