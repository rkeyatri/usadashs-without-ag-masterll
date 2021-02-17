import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService, AlertService } from '../services';
import { Import, MetaData, GraphModel } from '../models';
import { IMPORT_COLS } from '../helpers/import.columns';   
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexResponsive, ApexStroke, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from 'ng-apexcharts';
@Component({
  selector: 'app-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.scss']
})

export class ImportsComponent implements OnInit {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  charts: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  responsive: ApexResponsive[]; 
  legends: ApexLegend; 
  title:ApexTitleSubtitle;


  importKeys = IMPORT_COLS;
  params: object;
  shipments: Import[];
  meta: MetaData;
  graphdata: GraphModel;
  GraphModel: any;
  shipmentFilters: [];
  filterCountry: any;
  countryGraph:any;
  filterHscode: any;
  filterPort: any;
  filterUnit: any;
  filterExporter:any;
  filterImporter:any;
  selectedhscode: string[];
  selectedItems: string[];
  selectedg: string[];
  selectedport: string[];
  selectedUnit:string[];
  selectedEX:string[];
  selectedImp:string[];
  coun: GraphModel[];
  pageIndex = 1;
  pageSize = 20;
  viewPort = [1270, 550];
  viewPiePort = [1200, 500];
  formData: any;
  country: any; 
  importer: any;
  impAp: any;
  impTotal: any;  
  exporter: any;
  expAp: any;
  expTotal: any;
  month: any;
  port: any;
  unit: any;
  hscode: any;
  notify:any;
  importergr: any; 
  view: any[] = [600, 300];
  label: any;
  value: string;
  show: boolean = true;
  expand:boolean=true;
  count:boolean=true;
  loader:boolean=true;
  preloader:boolean=true;
  hsc:boolean=true;
  prt:boolean=true;
  unt:boolean=true;
  impt:boolean=true;
  expt:boolean=true;
  dataMap: any;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;  
  showXAxisLabel = true;
  xAxisLabel = true;
  showYAxisLabel = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  animations: boolean = true;
  yAxisLabel = 'Sales';
  timeline = true;
  legend: boolean = true;
  legendPosition: string = 'right';
  countrytext;
  countryScheme = {
  domain: ['rgb(3, 169, 244)', 'rgb(41, 182, 246)', 'rgb(79, 195, 247)', 'rgb(129, 212, 250)', 'rgb(179, 229, 252)', 'rgb(225, 245, 254)']
  };
  monthScheme = {
    domain: ['#ffc75f']
  };
  importerScheme = {
    domain: ['#23120b', '#21209c', '#fdb827']
  };
  exporterScheme = {
    domain: ['#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a', '#f3e562', '#ff9800', '#ff5722', '#ff4514'
    ]

  };
  HsCodeScheme = {
    domain: ['rgb(3, 169, 244)', 'rgb(41, 182, 246)', 'rgb(79, 195, 247)', 'rgb(129, 212, 250)', 'rgb(179, 229, 252)', 'rgb(225, 245, 254)']

  };
  UnitScheme = {
    domain: ['#615dec', '#ffad5a', '#86f3b8', '#76e2f4']
  };
  PortScheme = {
    domain: ['#ffa258', '#fff7c2', '#a02a63']
  };

  selectedItem: 0;
  showLabels = true;
  chartOptions;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private ds: DataService
  ) {
    
  }


  toggle() {
    this.show = !this.show;
  }
  countr(){
    this.count=!this.count;
  }
  hscod(){
    this.hsc=!this.hsc;
  }
  portc(){
    this.prt=!this.prt;
  }
  unitc(){
    this.unt=!this.unt;
  }
  importerc(){
    this.impt=!this.impt;
  }
  exporterc(){
    this.expt=!this.expt;
  }
  ngOnInit() {
    const urlParams = combineLatest(
      this.route.params,
      this.route.queryParams,
      (params, queryParams) => ({ ...params, ...queryParams })
    );

    urlParams.subscribe(routeParams => {
      this.params = routeParams;
      this.params['mode'] = 'import';
      this.searchData(this.params, true);
      this.selectedItems = new Array<string>();
      this.selectedhscode = new Array<string>();
      this.selectedhscode= new Array<string>();
      this.selectedItems= new Array<string>();
      this.selectedg= new Array<string>();
      this.selectedport= new Array<string>();
      this.selectedUnit= new Array<string>();
      this.selectedEX= new Array<string>();
      this.selectedImp= new Array<string>();
    });
    // this.selectedItems = new Array<string>();  
    // this.selectedhscode = new Array<string>();  
    // this.countrychart();
    //this.pieChart
  } 
  onSearchSubmit(form: any) {
    const searchFormData = form.value;
    console.log(this.formData)
    if (searchFormData.mode === 'imports') {
      this.router.navigate(['/imports'], { queryParams: this.getFormParams(searchFormData) });
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
  private dashboard():void{
 
    this.series=[{
      name:"Total Value in USD",
      data:this.impTotal
    }];
   
       
    this.xaxis={
      categories:this.impAp,     
    },
    this.legends= {
      position: "right",
      offsetX: 0,
      offsetY: 50
    }
    this.chart ={    
      type:'bar',
      height: 450,  
    },
    this.responsive=[
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    this.tooltip={
      y: {
        formatter: function(val) {
          return "$ " + val;
        }
      }
    } 
  }
  private exporterAnalysis():void{
 
    this.series=[{
      name:"Total Value in USD",
      data:this.expTotal
    }]; 
    this.xaxis={
      categories:this.expAp,     
    },
    this.legends= {
      position: "right",
      offsetX: 0,
      offsetY: 50
    }
    this.charts ={    
      type:'bar',
      height: 450,  
    },
    this.responsive=[
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    this.tooltip={
      y: {
        formatter: function(val) {
          return "$ " + val;
        }
      }
    } 
  }
  onCheckedhs(e: any, value: any, hscodeID: any) {
    if (e.target.checked) {
      console.log(value + "Chechked");
      this.selectedhscode.push(value);
    } else {
      console.log(value + "Unchechked");
      this.selectedhscode = this.selectedhscode.filter(m => m != value);
    }
    console.log(this.selectedItems);
    console.log(hscodeID)
    let filtterValue = this.selectedhscode.join()
    this.params[hscodeID] = filtterValue;
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
  onCheckedPort(e: any, value: any, portID: any) {
    if (e.target.checked) {
      console.log(value + "Chechked");
      this.selectedport.push(value);
    } else {
      console.log(value + "Unchechked");
      this.selectedport = this.selectedport.filter(m => m != value);
    }
    console.log(this.selectedport);
    console.log(portID)
    let filtterPort = this.selectedport.join()
    this.params[portID] = filtterPort;
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
  onCheckedUnit(e: any, value: any, unitID: any) {
    if (e.target.checked) {
      console.log(value + "Chechked");
      this.selectedUnit.push(value);
    } else {
      console.log(value + "Unchechked");
      this.selectedUnit = this.selectedUnit.filter(m => m != value);
    }
    console.log(this.selectedUnit);
    console.log(unitID)
    let filtterunit = this.selectedUnit.join()
    this.params[unitID] = filtterunit;
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
  
  onCheckedEx(e: any, value: any, exporterID: any) {
    if (e.target.checked) {
      console.log(value + "Chechked");
      this.selectedEX.push(value);
    } else {
      console.log(value + "Unchechked");
      this.selectedEX = this.selectedEX.filter(m => m != value);
    }
    console.log(this.selectedEX);
    console.log(exporterID)
    let filtterEx = this.selectedEX.join()
    this.params[exporterID] = filtterEx;
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
  onCheckedIm(e: any, value: any, importerID: any) {
    if (e.target.checked) {
      console.log(value + "Chechked");
      this.selectedImp.push(value);
    } else {
      console.log(value + "Unchechked");
      this.selectedItems = this.selectedImp.filter(m => m != value);
    }
    console.log(this.selectedImp);
    console.log(importerID)
    let filtterValue = this.selectedImp.join()
    this.params[importerID] = filtterValue;
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
  getFormParams(formData: object) {
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
    if (tab.for === 'Dashboard') {
      this.ds.getGraph(this.params)
        .pipe(map(res => res))
        .subscribe(
          res => { 
            let country = res.countryGraphas;
            let list = res.countryGraphas;
            let monthrGraph = res.monthGraphas;
            let importerGraph = res.consigneeGraphas;
            let exporterGraph = res.shipperGraphas;
            let unitGraph = res.unitGraphas;
            let portGraph = res.unloadingPortGraphas;
            let HsCodeGraph = res.hscodeGraphas;
            let totifyGraph = res.notifyPartyGraphas;  
            this.filterCountry = country; 
            this.month = monthrGraph;
            this.country=list;
            this.importer = importerGraph;
            this.exporter = exporterGraph;
            this.unit = unitGraph;
            this.port = portGraph;
            this.hscode = HsCodeGraph;
            this.notify=totifyGraph;
            this.loader=false;
          
          })
    }
    if (tab.for === 'ImporterAnalysis') {
      this.ds.getGraph(this.params)
        .pipe(map(res => res))
        .subscribe(
          res => {
            let countryGraph = res.countryGraphas;
            let monthrGraph = res.monthGraphas;
            let importerGraph = res.consigneeGraphas;
            let exporterGraph = res.shipperGraphas;
            let unitGraph = res.unitGraphas;
            let portGraph = res.unloadingPortGraphas;
            let HsCodeGraph = res.hscodeGraphas;
            let totifyGraph = res.notifyPartyGraphas; 
            let name = []
            for (var i in importerGraph) {
              var seriedata1 = new Array(importerGraph[i].name);
              name.push(seriedata1);
            }
            let ctotal = []
            for (var i in importerGraph) {
              var seriedata2 = new Object(importerGraph[i].value);
              ctotal.push(seriedata2);
            }     
            this.country=countryGraph;
            this.impTotal=ctotal; 
            this.impAp =name;
            console.log(this.impTotal)
          
            this.month = monthrGraph;
            this.importer = importerGraph;
            this.exporter = exporterGraph;
            this.unit = unitGraph;
            this.port = portGraph;
            this.hscode = HsCodeGraph;
            this.notify=totifyGraph;
            this.loader=false;
            this.dashboard();
          })
         
    }
    if (tab.for === 'exporterAnalysis') {
      this.ds.getGraph(this.params)
        .pipe(map(res => res))
        .subscribe(
          res => {
            let countryGraph = res.countryGraphas;
            let monthrGraph = res.monthGraphas;
            let importerGraph = res.consigneeGraphas;
            let exporterGraph = res.shipperGraphas;
            let unitGraph = res.unitGraphas;
            let portGraph = res.unloadingPortGraphas;
            let HsCodeGraph = res.hscodeGraphas;
            let totifyGraph = res.notifyPartyGraphas; 
            let name = []
            for (var i in exporterGraph) {
              var seriedata1 = new Array(exporterGraph[i].name);
              name.push(seriedata1);
            }
            let ctotal = []
            for (var i in exporterGraph) {
              var seriedata2 = new Object(exporterGraph[i].value);
              ctotal.push(seriedata2);
            }     
            this.expTotal=ctotal; 
            this.expAp =name;
            this.country = countryGraph;
            this.month = monthrGraph;
            this.importer = importerGraph;
            this.exporter = exporterGraph;
            this.unit = unitGraph;
            this.port = portGraph;
            this.hscode = HsCodeGraph;
            this.notify=totifyGraph;
            this.loader=false;
            this.exporterAnalysis(); 
          })
         
    }
  }
   
  searchData(params: object, updateFilter?: boolean) {
    params['pageIndex'] = this.pageIndex;
    params['pageSize'] = this.pageSize;
    this.ds.getImportData(params)
      .subscribe(
        ({ imports, meta }) => { 
          if (imports != null) {
            this.shipments = imports;
            this.meta = meta;
            this.preloader=true; 
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

    if (updateFilter) {
      this.ds.getImportFilters(params)
        .pipe(map(data => data))
        .subscribe(
          data => {
            const list = data.country;
            const hsCode = data.hscode;
            const port = data.port;
            const unit = data.unit;
            const exp = data.exporter;
            const imp = data.importer;

            const country = { CountryID: list };
            this.filterCountry = country;

            const hscode = { hscodeID: hsCode };            
            this.filterHscode = hscode;

            const Port = { portID: port };
            this.filterPort = Port;

            console.log(this.filterPort)
            const Unit = { unitID: unit };
            this.filterUnit = Unit;
            
            const expt = { expoterID: exp };
            this.filterExporter = expt;

            const impt = { impoterID: imp };
            this.filterImporter = impt;
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