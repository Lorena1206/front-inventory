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


}
