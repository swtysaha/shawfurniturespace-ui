import { Component, OnInit } from '@angular/core';
import { Warehouses } from './warehouses';
import { WarehouseService } from './warehouses.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehouseComponent implements OnInit {

  warehouses: Warehouses[] = [];

  constructor(private warehouseService: WarehouseService) { }

  ngOnInit(): void {
    this.getWareHouseList();
  }

  getWareHouseList() {
    this.warehouseService.getWarehouses().subscribe(
      response => {
        this.warehouses = response;
      }
    )
  }

}
