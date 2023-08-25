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
}
