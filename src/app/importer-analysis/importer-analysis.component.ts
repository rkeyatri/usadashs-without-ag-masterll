import { Component, OnInit } from '@angular/core'; 
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-importer-analysis',
  templateUrl: './importer-analysis.component.html',
  styleUrls: ['./importer-analysis.component.scss']
})
export class ImporterAnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let options = {
      chart: {
        type: 'bar'
      },
      title: { text: 'Apex Charts' },
      series: [{
        name: 'Revenue',
        data: [0, 10, 23, 17, 18, 9, 11, 27, 33, 40, 32, 35, 30, 40, 42, 47, 44, 48, 52, 54, 42, 55, 56, 57, 60, 50, 52, 51, 49, 53, 55, 60, 61, 59, 62, 65, 62, 58, 55, 61, 64, 65, 63, 66, 67, 69, 69, 70, 72, 68, 66, 65, 67, 70, 71, 72, 73, 45, 70, 68, 64, 60, 65, 67, 68, 69, 70, 72, 75, 80, 10, 23, 17, 18, 9, 11, 27, 33, 40, 32, 35, 30, 40, 42, 47, 44, 48, 52, 54, 42, 55, 56, 57, 60, 50, 52, 51, 49, 53, 55, 60, 61, 59, 62, 65, 62, 58, 55, 61, 64, 65, 63, 66, 67, 69, 69, 70, 72, 68, 66, 65, 67, 70, 71, 72, 73, 45, 70, 68, 64, 60, 65, 67, 68, 69, 70, 72, 75, 80]
      }, {
        name: 'Revenue Ref',
        data: [0, 5, 15, 9, 10, 5, 3, 19, 25, 32, 24, 27, 22, 32, 34, 39, 36, 40, 44, 46, 34, 47, 48, 49, 52, 42, 44, 43, 41, 45, 47, 52, 53, 51, 54, 57, 54, 50, 47, 53, 56, 57, 55, 58, 59, 61, 61, 62, 64, 60, 58, 57, 9, 2, 63, 64, 6, 37, 22, 60, 56, 52, 57, 59, 60, 61, 62, 64, 67, 72, 5, 15, 9, 10, 5, 3, 19, 25, 32, 24, 27, 22, 32, 34, 39, 36, 40, 44, 46, 34, 47, 48, 49, 52, 42, 44, 43, 41, 45, 47, 52, 53, 51, 54, 57, 54, 50, 47, 53, 56, 57, 55, 58, 59, 61, 61, 62, 64, 60, 58, 57, 9, 2, 63, 64, 6, 37, 22, 60, 56, 52, 57, 59, 60, 61, 62, 64, 67, 72]
      }],
      xaxis: {
        axisTicks: { show: true }
      },
      yaxis: [
        {
          title: {
            text: "Title1"
          },
          axisBorder: {
            show: true,
            color: '#0f0ffa'
          },
          axisTicks: {
            show: true,
            color: '#0f0ffa'
          },
          labels: {

            formatter: (label) => `000${label}`
          }
        },
        {
          title: {
            text: "Title2"
          },
          axisBorder: {
            show: true,
            color: '#fa0f0f'
          },
          axisTicks: {
            show: true,
            color: '#fa0f0f'
          },
          opposite: true
        }
      ],
      colors: ['#0f0ffa', '#fa0f0f'],
      markers: {
        size: 3,
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'middle',
        offsetY: -5
      },
      stroke: {
        width: 2
      }
    }

    // let chart = new ApexCharts(document.querySelector("#chart"), options);

    // chart.render();

  }

}
