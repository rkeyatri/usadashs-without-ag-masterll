import { Component, Input, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() data:string;
  series:ApexAxisChartSeries;
  chart:ApexChart;
  title:ApexTitleSubtitle

  constructor() { }

  ngOnInit() {

      this.dashboard();
      }
      private dashboard(): void {
      this.title = {
        text: 'Country'
      }

      this.series = [{
        name: 'india',
        data: [12, 4, 16, 18]
      }];
      this.chart = {
        type: 'bar'
      }
   


}
}
