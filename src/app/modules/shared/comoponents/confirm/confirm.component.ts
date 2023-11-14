import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  
  private categoryService= inject (CategoryService);
  private dialogRef= inject (DialogRef);
  public data = inject(MAT_DIALOG_DATA);
 

  OnNoClick(){
    this.dialogRef.close(3);

  }

  delete(){
    if (this.data !=null){
      this.categoryService.deleteCategorie(this.data.id).
      subscribe (( data:any)=>{
        this.dialogRef.close(1);
      }, (error: any)=>{
        this.dialogRef.close(2);
      })
      
    } else{
      this.dialogRef.close(2);
    }

  }

}
