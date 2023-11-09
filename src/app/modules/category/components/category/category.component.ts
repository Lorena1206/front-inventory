import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  private categoryService = inject(CategoryService);
  public dialog = inject(MatDialog);
  private snackbar = inject(MatSnackBar);


  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = ['id','name','description','actions'];
  dataSource = new MatTableDataSource<CategoryElement>();


  getCategories(): void{

    this.categoryService.getCategories()
    .subscribe(( data: any) => {

      console.log("respuesta categories:", data);
      this.processCategoriesResponse(data);
    }, (error: any) => {
      console.log("error: " , error);
    })
  }

  processCategoriesResponse(resp: any){
    const dataCategory: CategoryElement[] = [];

    if( resp.metadata[0].code == "00"){
      let listCategory = resp.categoryResponse.category;

      listCategory.forEach((element: CategoryElement ) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if( result ==1){
        this.openSnackBar("Cateoria agregada", "Exitosa");
        this.getCategories();

      } else if (result ==2){
        this.openSnackBar("Se produjo un error al guardar categoria", "Error")
      }
     
    });
  }

  openSnackBar(message: string, action:string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackbar.open(message, action, {
      duration: 2000
    })
  }

}

export interface CategoryElement{
  description: string;
  id: number;
  name: string;
}