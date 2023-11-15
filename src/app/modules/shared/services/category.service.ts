import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_Url = "http://localhost:8080/api/v1";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient) { }
  /**
   * Get all categories
   */

  getCategories(){

    const endpoint =  `${base_Url}/categories`;
    return this.http.get(endpoint);

  }

  /**
   * save the categories
   *
   */
  saveCategorie(body: any){
    const endpoint=`${base_Url}/categories`;
    return this.http.post(endpoint,body);
  }

  /**
   * update categories
   */

  updateCategorie( body: any, id: any){
    const endpoint=`${base_Url}/categories/${id}`;
    return this.http.put(endpoint,body);
  }

  /**
   * Delete a category
   */

  deleteCategorie( id: any){
    const endpoint = `${base_Url}/categories/${id}`;
    return this.http.delete(endpoint,id);

  }

   /**
   *Buscar id 
   */

   GetCategorieById( id: any){
    const endpoint = `${base_Url}/categories/${id}`;
    return this.http.get(endpoint,id);

  }
  


}
