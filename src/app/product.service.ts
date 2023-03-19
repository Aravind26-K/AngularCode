import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:8081/api/list"
  
  //API to fetch all products from database
  fetchProducts() {
    return this.http.get(this.url);
  }
  //API to delete  product from database
  deleteProduct(id) {
    // return this.http.delete(this.url+"/"+id)
    return this.http.delete(this.url + "/" + id);
  }
  //API to create new product in database
  createProduct(body) {
    return this.http.post('http://localhost:8081/api/saveProduct', body)
  }
  //API to update existing product in database
  updateProduct(body) {
    return this.http.put(this.url , body)
  }
}
