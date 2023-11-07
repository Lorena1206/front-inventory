import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidena',
  templateUrl: './sidena.component.html',
  styleUrls: ['./sidena.component.scss']
})
export class SidenaComponent {


  mobileQuery: MediaQueryList;

  menuNav =[
    {name: "Home", route: "home", icon: "home" },
    {name: "Categorías", route: "category", icon: "category" },
    {name: "Productos", route: "home", icon: "production_quantity_limits" }
  ]

  constructor(media: MediaMatcher){

    this.mobileQuery = media.matchMedia('(max-width:600px)');
  }

}
