import { Routes } from "@angular/router";
import HomeComponent from "./home.component";

export const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
        {
            path:'',
            loadComponent:()=>import('./home.component')
        },
        {
            path:'sobremi',
            loadComponent:()=>import('../contact/contact.component')
            
        },
        {
            path:'skills',
            loadComponent:()=>import('../skills/skills.component')
        },
        {
            path:'proyects',
            loadComponent:()=>import('../proyects/proyects.component')
        },
        {
            path:'contact',
            loadComponent:()=>import('../contact/contact.component')
        },
      
    ]

    }
    
]