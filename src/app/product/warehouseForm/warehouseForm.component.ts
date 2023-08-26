import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { WarehouseService } from 'src/app/warehouse/warehouses.service';


@Component({
  selector: 'warehouse-form',
  templateUrl: './warehouseForm.component.html',
  styleUrls: ['./warehouseForm.component.css']
})
export class WarehouseFormComponent implements OnInit {

  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

  warehouseForm = this.fb.group({
    location: ["", Validators.required],
    capacity: [0, Validators.required],
    availableSpace: [0, Validators.required],
   });
  constructor(private fb: FormBuilder, private warehouseService: WarehouseService,
    private messageService: MessageService, private _router: Router) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.warehouseForm.reset();
    this.clickClose.emit(true);
  }

  addWarehouse() {
    this.warehouseService.saveWarehouse(this.warehouseForm.value).subscribe(
      response => {
        this.clickAdd.emit(response);
        this.closeModal();
       // this._router.navigate(['Warehouse'])
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Warehouse added' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        console.log('Errror occured');
        console.log(error);
      }
    )
  }

}