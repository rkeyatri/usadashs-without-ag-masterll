import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators'; 

import { DataService, AlertService } from '../services';
import { Import, MetaData, GraphModel } from '../models';
import { IMPORT_COLS } from '../helpers/import.columns';  
import { isObject } from 'util';
import { stringify } from '@angular/compiler/src/util';

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
    GraphModel:any
    compaeData: [];
    shipmentFilters = []; 
    checkedItems: any = [];
    coun:GraphModel[];
    pageIndex = 1;
    pageSize = 20; 
    viewPort = [1270, 550];
    viewPiePort = [1200, 500];
    formData: any ;
    show:boolean=true;
   
       chartOptions;    constructor(
            private router: Router,
            private route: ActivatedRoute,
            private alertService: AlertService,
            private ds: DataService
        ) { 
        
      this.chartOptions = {
        series: [
          {
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          }
        ],
        chart: {
          height: 350,
          type: "bar",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Jan",
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep"
          ]
        }
      }; 
    }

    toggle(){
      this.show=!this.show;
    }
    
    //   var checkboxSelection = function (params) {
    //     return params.columnApi.getRowGroupColumns().length === 0;
    //   };
    //   var headerCheckboxSelection = function (params) {
    //     return params.columnApi.getRowGroupColumns().length === 0;
    //   };
    //  }
 
  
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
            this.onChecked(this.params, true);         
        });
    }
 
    getGraph(params:object){
      this.ds.getGraph(params)
      .pipe(map(data=>data))
      .subscribe(
        data =>{
         this.GraphModel=data;
          this.coun= data.countryGraphas 
        }
      )
    }
    onSearchSubmit(form: any){
      const searchFormData = form.value;  
      console.log(this.formData)
      if(searchFormData.mode === 'imports') { 
          this.router.navigate(['/imports'], { queryParams: this.getFormParams(searchFormData)});
        
          
      } 
    }
    onChecked(key: any, event: any ) {
      let { checked, value} = event.target;
      if (checked) {
        this.checkedItems.push(value); 
        console.log(this.checkedItems)
      } else {
        let index = this.checkedItems.indexOf(value);
        if (index !== -1) this.checkedItems.splice(index, 1);
        console.log(this.checkedItems)
      }   
       this.getFormParams;
      this.params[key] = value;
      this.pageIndex = this.pageIndex;
      this.pageSize = this.pageSize; 
       const qParams: object = {};

      console.log(this.searchData)
      qParams[value] = value;
      let s= JSON.stringify(this.params)
      let v =JSON.parse(s)
      alert(v)
      this.searchData(this.params, true);
      // console.log(qParams) 
     const data= this.checkedItems;
      console.log(this.searchData)
      qParams[value] = value;
      console.log(qParams)

       this.searchData(this.checkedItems, true);  
        const filterList = data + '&countryID=' + this.checkedItems ;
      //alert(filterList)        
      let lis= JSON.parse(filterList)
      //  this.ds.getImportData(params: object)
      //  searchData(params: object, updateFilter?: boolean) { 
          this.ds.getImportData(lis)
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

      // const qParams: object = [];
      // console.log(this.searchData)
      // qParams[value] = value;
      // console.log(qParams)
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
  
    // onChecked(name: any, event: any) {
    //   let { checked, value } = event.target;
    //   if (checked) {
    //     this.checkedItems.push(value);
       
    //     console.log(this.checkedItems)
    //   } else {
    //     let index = this.checkedItems.indexOf(value);
    //     if (index !== -1) this.checkedItems.splice(index, 1);
    //     console.log(this.checkedItems)
    //   }
    
    // }
    
    






























    onSwitchTab(tab: any) {
        // if (tab.for === 'charts') {
        //     this.ds.getImportCharts(this.params)
        //     .pipe(
        //         map(
        //             data =>  data[0]
        //         )
        //     )
        //     .subscribe(
        //         (data) => {
        //             this.graphdata = data;
        //         }
        //     );
        // }
        if(tab.for === 'comparision'){
            /*
            this.compaeData = [
                {
                  "name": "Montenegro",
                  "series": [
                    {
                      "value": 4501,
                      "name": "2016-09-22T17:36:27.541Z"
                    },
                    {
                      "value": 2032,
                      "name": "2016-09-21T18:12:46.985Z"
                    },
                    {
                      "value": 6929,
                      "name": "2016-09-18T09:58:35.224Z"
                    },
                    {
                      "value": 3650,
                      "name": "2016-09-18T21:18:02.305Z"
                    },
                    {
                      "value": 4792,
                      "name": "2016-09-13T02:57:23.056Z"
                    }
                  ]
                },
                {
                  "name": "Cambodia",
                  "series": [
                    {
                      "value": 5993,
                      "name": "2016-09-22T17:36:27.541Z"
                    },
                    {
                      "value": 4032,
                      "name": "2016-09-21T18:12:46.985Z"
                    },
                    {
                      "value": 6724,
                      "name": "2016-09-18T09:58:35.224Z"
                    },
                    {
                      "value": 5023,
                      "name": "2016-09-18T21:18:02.305Z"
                    },
                    {
                      "value": 5763,
                      "name": "2016-09-13T02:57:23.056Z"
                    }
                  ]
                },
                {
                  "name": "Bahamas",
                  "series": [
                    {
                      "value": 6671,
                      "name": "2016-09-22T17:36:27.541Z"
                    },
                    {
                      "value": 3895,
                      "name": "2016-09-21T18:12:46.985Z"
                    },
                    {
                      "value": 2223,
                      "name": "2016-09-18T09:58:35.224Z"
                    },
                    {
                      "value": 4317,
                      "name": "2016-09-18T21:18:02.305Z"
                    },
                    {
                      "value": 3959,
                      "name": "2016-09-13T02:57:23.056Z"
                    }
                  ]
                },
                {
                  "name": "French Southern Territories",
                  "series": [
                    {
                      "value": 5375,
                      "name": "2016-09-22T17:36:27.541Z"
                    },
                    {
                      "value": 4933,
                      "name": "2016-09-21T18:12:46.985Z"
                    },
                    {
                      "value": 2171,
                      "name": "2016-09-18T09:58:35.224Z"
                    },
                    {
                      "value": 6742,
                      "name": "2016-09-18T21:18:02.305Z"
                    },
                    {
                      "value": 6318,
                      "name": "2016-09-13T02:57:23.056Z"
                    }
                  ]
                },
                {
                  "name": "Estonia",
                  "series": [
                    {
                      "value": 4523,
                      "name": "2016-09-22T17:36:27.541Z"
                    },
                    {
                      "value": 4272,
                      "name": "2016-09-21T18:12:46.985Z"
                    },
                    {
                      "value": 5032,
                      "name": "2016-09-18T09:58:35.224Z"
                    },
                    {
                      "value": 2783,
                      "name": "2016-09-18T21:18:02.305Z"
                    },
                    {
                      "value": 4880,
                      "name": "2016-09-13T02:57:23.056Z"
                    }
                  ]
                }
              ];
              */
            // this.ds.getImportComparision(this.params)
            // .subscribe(
            //     (data) => {
            //         this.compaeData = data;
            //     }
            // );
        }
    }
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
                  this.shipmentFilters = data; 
                  console.log(this.shipmentFilters)
              }
          )
      }
     
  }
  
  
    filterData(name: any, value: any) {
        // let { checked, value} = event.target;
        // if (checked) {
        //       this.checkedItems.push(value); 
        //       console.log(this.checkedItems)
        //     } else {
        //       let index = this.checkedItems.indexOf(value);
        //       if (index !== -1) this.checkedItems.splice(index, 1);
        //       console.log(this.checkedItems)
        //     }

        this.params[name] = value;
        this.pageIndex = 1;
        this.searchData(this.checkedItems, true);
        const qParams: object = [];
        qParams[name] = value;
        this.router.navigate([], { queryParams: qParams, queryParamsHandling: 'merge' });
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
 