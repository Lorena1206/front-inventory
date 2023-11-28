import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  private productService = inject(ProductService);
  private dialog = inject( MatDialog);
  private snackbar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = ['id','name','price','account', 'category' ,'picture'];

  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts(){
    this.productService.getProducts()
    .subscribe( (data: any) =>{
      console.log("respuesta de productos;", data);
      this.proccesProductResponse(data);
    }, (error: any) =>{
      console.log ("Error en productos", error);
    })

  }


  proccesProductResponse(resp: any){ 
    const dateProduct: ProductElement[] = [];
    if (resp.metadata[0].code == "00"){
      let listCProducts = resp.product.products;
      
      listCProducts.forEach((element: ProductElement) =>{
        element.category = element.category.name;
        element.picture = 'data : image/jpg;base64,' +element.picture;
        dateProduct.push(element);
      });

      console.log(dateProduct)

      //set the datasource
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }
  }


  openProductDialog(){
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if( result ==1){
        this.openSnackBar("Producto agregado", "Exitoso");
        this.getProducts();
      } else if (result ==2){
        this.openSnackBar("Se produjo un error al guardar producto", "Error")
      }
     
    });
  }


  openSnackBar(message: string, action:string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackbar.open(message, action, {
      duration: 2000
    })
  }

}

export interface ProductElement{
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;
}
