import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';  
import { DataService, AlertService } from '../services';
import { Import, MetaData, GraphModel } from '../models';
import { IMPORT_COLS } from '../helpers/import.columns'; 
import { GoogleChartInterface } from 'ng2-google-charts';
 
@Component({
    selector: 'app-imports',
    templateUrl: './imports.component.html',
    styleUrls: ['./imports.component.scss']
})

export class ImportsComponent implements OnInit {  
    importKeys = IMPORT_COLS;
    params: object;
    shipments: Import[]; 
    meta: MetaData;
    graphdata: GraphModel;
    GraphModel:any;
    shipmentFilters:[];
    filterCountry:any;  
    filterHscode:any; 
    filterPort:any; 
    filterUnit:any; 
    selectedhscode:string[];
    selectedItems:string [];
    coun:GraphModel[];
    pageIndex = 1;
    pageSize = 20; 
    viewPort = [1270, 550];
    viewPiePort = [1200, 500];
    formData: any ;
    country:any;
    countrygraph:any;
    label:any;
    value:string;
    show:boolean=true;  
    dataMap : any;

        constructor(
            private router: Router,
            private route: ActivatedRoute,
            private alertService: AlertService,
            private ds: DataService
        ) {  
          this.dataMap = {};
          let loadData = function(_data){
            return new Promise(function(resolve,reject){
              resolve(_data);
            });
            
          } 
          
        } 
        
    toggle(){
      this.show=!this.show;
    } 
    ngOnInit() {
        const urlParams = combineLatest(
            this.route.params,
            this.route.queryParams,
            (params, queryParams) => ({ ...params, ...queryParams})
            
        );

        urlParams.subscribe(routeParams => {
            this.params = routeParams;
            this.params['mode'] = 'import'; 
            this.searchData(this.params, true);
            this.selectedItems = new Array<string>();  
            this.selectedhscode = new Array<string>();  
                
        });
        // this.selectedItems = new Array<string>();  
        // this.selectedhscode = new Array<string>();  
        // this.countrychart();
        //this.pieChart
    }
  
    onSearchSubmit(form: any){
      const searchFormData = form.value;  
      console.log(this.formData)
      if(searchFormData.mode === 'imports') { 
          this.router.navigate(['/imports'], { queryParams: this.getFormParams(searchFormData)});
      } 
    }  

    onChecked(e: any, value: any, countryID: any) {
    if (e.target.checked) {
      console.log(value + "Chechked");
      this.selectedItems.push(value);
    } else {
      console.log(value + "Unchechked");
      this.selectedItems = this.selectedItems.filter(m => m != value);
    }
    console.log(this.selectedItems);
    console.log(countryID)
    let filtterValue = this.selectedItems.join()
    this.params[countryID] = filtterValue;
    this.pageIndex = 1;
    this.ds.getImportData(this.params)
      .subscribe(
        ({ imports, meta }) => {
          console.log(imports)
          if (imports != null) {
            this.shipments = imports;
            this.meta = meta;
            console.log(this.meta)
          } else {
            alert('Null');
          }
          window.scroll(0, 320);
        },
      )

  } 

              onCheckedhs(e: any, value:any, hscodeID:any) { 
                if (e.target.checked) {
                  console.log(value + "Chechked"); 
                  this.selectedhscode.push(value);
                } else {
                  console.log(value + "Unchechked");
                  this.selectedhscode =this.selectedhscode.filter(m=>m!=value);
                }  
                console.log(this.selectedItems); 
                console.log(hscodeID)
                let filtterValue=this.selectedhscode.join()
                this.params[hscodeID] = filtterValue;
                this.pageIndex = 1;    
                    this.ds.getImportData(this.params)
                     .subscribe(
                         ({ imports, meta }) => {
                             console.log(imports)
                             if (imports != null) { 
                                  this.shipments=imports; 
                                 this.meta = meta;
                                  console.log(this.meta)
                             } else {
                                 alert('Null');
                             }
                             window.scroll(0, 320);
                         },
                     )
           
                        }
    getFormParams(formData: object){
        const formParams = {};
        Object.entries(formData).forEach(
            ([key, value]) => {
                if (value !== '' && key !== 'mode') {
                    formParams[key] = value;
                }
            }
        );
        return formParams;
    }
   
    onSwitchTab(tab: any) {
        if(tab.for === 'Dashboard'){
          this.ds.getGraph(this.params)
      .pipe(map(res=>res))
      .subscribe(
        res =>{
        let countrygr=res.countryGraphas;
        var arrSales = [];
        for (var i in countrygr) {
            var country = new Array(countrygr[i].name, countrygr[i].total);
            arrSales.push(country);
        }
        let LINE_DATA = this.countrygraph
      this.countrygraph=arrSales; 
      console.log(this.countrygraph)   
    })    
  }  
}
// public pieChart: GoogleChartInterface = { 
//   chartType:'PieChart',
//   dataTable:this.countrygraph,  
//   options: {'title': 'Country'}  
// } 
    searchData(params: object, updateFilter?: boolean) {
      params['pageIndex'] = this.pageIndex;
      params['pageSize'] = this.pageSize;
      this.ds.getImportData(params)
          .subscribe(
              ({ imports, meta }) => {
                  console.log(imports)
                  if (imports != null) { 
                       this.shipments=imports; 
                      this.meta = meta;
                       console.log(this.meta)
                  } else {
                      alert('No records found');
                  }
                  window.scroll(0, 320);
              },
          error => {
              this.shipments = null;
              this.meta = null;
              alert('No records found')
          }
      );

      if(updateFilter) {
          this.ds.getImportFilters(params)
          .pipe(map(data => data))
          .subscribe(
              data => { 
                 const list = data.country;
                 const hsCode=data.hscode;
                 const port=data.port;
                 const unit=data.unit;
                 const country = {CountryID:list};  
                 this.filterCountry = country; 
                 const hscode = {hscodeID:hsCode};  
                 this.filterHscode = hscode; 
                 const Port = {portID:port};  
                 this.filterPort = Port;
                 const Unit = {unitID:unit};  
                 this.filterPort = Unit;   
              }
          )
      }
     
  } 
    goToPage(n: number): void {
        this.pageIndex = n;
        this.searchData(this.params);
    }
    onNext(): void {
        this.pageIndex++;
        this.searchData(this.params);
    }
    onPrev(): void {
        this.pageIndex--;
        this.searchData(this.params);
    }
    onResize(event) {
        const width = event.target.innerWidth;
        this.viewPort = [width - 110, 550];
        this.viewPiePort = [width - 120, 550];
    }
     
  
}