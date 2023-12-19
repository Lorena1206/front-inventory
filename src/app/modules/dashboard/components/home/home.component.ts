import { Component, inject } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductElement } from 'src/app/modules/product/product/product.component';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private productService = inject(ProductService);

  chartBar: any;
  chartdoughnut: any;

  ngOnInit(): void {
    this.getProducts();

  }


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
    const nameProduct: string [] = [];
    const account: number [] = [];

    
      if (resp.metadata[0].code == "00") {
        let listCProducts = resp.product.products;

        listCProducts.forEach((element: ProductElement) => {
          nameProduct.push(element.name);
          account.push(element.account);
        });

        //grafico de barras
        this.chartBar = new Chart('canvas-bar', {
          type:'bar',
          data:{
            labels: nameProduct,
            datasets: [
              {label:'Productos', data: account}
            ]
          }
          
        });

          //grafico donna

        this.chartdoughnut = new Chart('canvas-doughnut', {
          type:'doughnut',
          data:{
            labels: nameProduct,
            datasets: [
              {label:'Productos', data: account}
            ]
          }
          
        });
      } 

  }

}
