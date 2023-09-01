import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,private _router: Router) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/product/all');
  }
 
  saveProduct(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.http.post('http://localhost:8080/product/store', postData );
    } else {
      postData.productId = selectedPdt.productId
      postData.warehouseId = selectedPdt.warehouseId.id;
      console.log(postData)
      return this.http.put('http://localhost:8080/product/update', postData);
    }

  }


  deleteProduct(productId: any) {
    let url = 'http://localhost:8080/product/id/'+ productId;
    return this.http.delete(url);
  }
  updateProduct(postData: any) {
    return this.http.put('http://localhost:8080/product/store', postData );
  }


}
