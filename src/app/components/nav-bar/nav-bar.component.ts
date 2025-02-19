import { Component } from '@angular/core';
import { NavItemConfig } from '../../interfaces/ui-configs/nav-item-config.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(private router:Router){}

  navItems : NavItemConfig[] = [
    {
      name: 'Movies',
      path: 'movies',
      active : false
    },
    {
      name: 'Tv Shows',
      path: 'tvshows',
      active : false
    },
    {
      name: 'Suggestions',
      path: 'suggestions',
      icon: 'bi bi-arrow-right',
      active : false
    }
  ]

  selectNavItem(clickedItem : NavItemConfig){
     this.navItems.map((navItem : NavItemConfig) => {
      navItem.active = clickedItem.name === navItem.name
     })
  }

  openHome(){
    this.router.navigateByUrl('');
  }

  openAllMovies(){

  }

  openAllTvShows(){
    
  }
}
