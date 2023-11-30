import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewProductComponent } from '../new-product/new-product.component';
import { ConfirmComponent } from '../../shared/comoponents/confirm/confirm.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private snackbar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts() {
    this.productService.getProducts()
      .subscribe((data: any) => {
        console.log("respuesta de productos;", data);
        this.proccesProductResponse(data);
      }, (error: any) => {
        console.log("Error en productos", error);
        this.proccesProductResponse(null);
      })

  }


  proccesProductResponse(resp: any) {
    const dateProduct: ProductElement[] = [];
    if (resp != null) {
      if (resp.metadata[0].code == "00") {
        let listCProducts = resp.product.products;

        listCProducts.forEach((element: ProductElement) => {
          //element.category = element.category.name;
          element.picture = 'data:image/jpg;base64,' + element.picture;
          dateProduct.push(element);
        });

        console.log(dateProduct)

        //set the datasource
      }
    }
    this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
    this.dataSource.paginator = this.paginator;

  }


  openProductDialog() {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Producto agregado", "Exitoso");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar producto", "Error")
      }

    });
  }


  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackbar.open(message, action, {
      duration: 2000
    })
  }

  edit(id: number, name: string, price: number, account: number, category: any) {

    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
      data: { id: id, name: name, price: price, account: account, category: category }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Producto editado", "Exitoso");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al editar producto", "Error")
      }

    });

  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: { id: id, module: "product" }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result == 1) {
        this.openSnackBar("Producto eliminado", "Exitoso");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar producto", "Error")
      }
    }
    )
  }


  buscar(name: any) {

    if (name.length === 0) {
      return this.getProducts();
    }
    this.productService.getProductByName(name)
      .subscribe((resp: any) => {
        this.proccesProductResponse(resp);
      })

  }

}

export interface ProductElement {
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;
}
