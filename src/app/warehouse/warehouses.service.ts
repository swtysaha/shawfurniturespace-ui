import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Warehouses } from './warehouses';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) { }

  getWarehouses(): Observable<Warehouses[]> {
    return this.http.get<Warehouses[]>('http://localhost:8080/warehouses/all');
  }

  saveWarehouse(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.http.post('http://localhost:8080/warehouses/store', postData );
    } else {
      postData.id = selectedPdt.id
      console.log(postData)
      return this.http.put('http://localhost:8080/warehouses/update', postData);
    }
  }
  deleteWarehouse(warehouseId: any) {
    let url = 'http://localhost:8080/warehouses/id/'+ warehouseId;
    return this.http.delete(url);
  }
  updateWarehouse(postData: any) {
    return this.http.put('http://localhost:8080/warehouses/store', postData );
  }
}
