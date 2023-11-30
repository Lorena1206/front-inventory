import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = 'http://localhost:8080/api/v1';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient ) { }

  /**
   * get all products
   */

  getProducts(){
    const endpoint = `${base_url}/products`;
    return this.http.get(endpoint);
  }

  //*** save the product*/
   saveProduct(body:any){
    const endpoint = `${base_url}/products`;
    return this.http.post(endpoint, body)
   }

   /**
    * update product
    */
   updateProduct(body: any, id: any){
    const endpoint = `${base_url}/products/${id}`;
    return this.http.put(endpoint,body);
   }


   /**
    * delete product
    */

   deleteProduct(id: any){
    const endpoint = `${base_url}/products/${id}`;
    return this.http.delete(endpoint);
  }


  /**
   * buscar producto por nombre
   */

  getProductByName(name:any){
    const endpoint = `${base_url}/products/filter/${name}`;
    return this.http.get(endpoint);
  }

}
