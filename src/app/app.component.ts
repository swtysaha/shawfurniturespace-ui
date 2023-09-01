import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _router: Router) { }
  title = 'shawfurniturespace';

    handleChange(e:any) {
      if(e.index == 0){
        this._router.navigate(['product'])
      }else if(e.index == 1){
        this._router.navigate(['warehouse'])
      }
  }

}
