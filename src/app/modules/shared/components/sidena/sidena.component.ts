import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidena',
  templateUrl: './sidena.component.html',
  styleUrls: ['./sidena.component.scss']
})
export class SidenaComponent {




  mobileQuery: MediaQueryList;
  username: any;
  private keyClockService = inject(KeycloakService);

  menuNav =[
    {name: "Home", route: "home", icon: "home" },
    {name: "Categorías", route: "category", icon: "category" },
    {name: "Productos", route: "product", icon: "production_quantity_limits" }
  ]

  constructor(media: MediaMatcher){

    this.mobileQuery = media.matchMedia('(max-width:600px)');
  }

  ngOnInit(): void{
    this.username = this.keyClockService.getUsername();

  }

  logout(){
    this.keyClockService.logout();

  }

}
