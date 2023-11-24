import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  private productService = inject(ProductService);

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

}

export interface ProductElement{
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;
}
