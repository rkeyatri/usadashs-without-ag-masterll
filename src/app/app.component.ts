import { Component, OnInit } from '@angular/core'; 
import { DynamicLoaderService } from 'angular-dynamic-loader';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private loader: DynamicLoaderService) { }
  
    ngOnInit() {
      /** spinner starts on init */
      this.loader.show();
  
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.loader.hide();
      }, 5000);
    }
}
