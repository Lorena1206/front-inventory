import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenaComponent } from './components/sidena/sidena.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    SidenaComponent
  ],
  exports:[
    SidenaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class SharedModule { }
