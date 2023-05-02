import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-multi-line-echart',
  templateUrl: './multi-line-echart.component.html',
  styleUrls: ['./multi-line-echart.component.css'],
})
export class MultiLineEchartComponent {
  chartOption!: EChartsOption;

  constructor() {}

  ngOnInit(): void {
    this.setChartData();
  }

  setChartData() {
    const mfData = [
      1095.801, 1106.092, 1121.512, 1124.829, 1128.236, 1129.792, 1134.662,
      1139.919, 1143.882, 1142.558, 1134.193, 1135.019, 1130.14, 1132.28,
      1131.265, 1139.309, 1142.23, 1146.262, 1152.383, 1159.281,
    ];
    const indexData = [
      14211.8, 14345.6, 14557.85, 14601.95, 14709.4, 14759.2, 14790.55,
      14867.25, 14941.55, 14954.25, 14904.3, 14897.0, 14856.9, 14861.75,
      14847.1, 14930.15, 14955.7, 14994.4, 15075.05, 15219.55,
    ];
    this.chartOption = {
      title: {
        text: 'Returns',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Mutual Fund Returns', 'Average Market Returns'],
      },
      xAxis: {
        axisTick: {
          show: true,
        },
        type: 'category',
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Mutual Fund Returns',
          data: this.getReturns(mfData),
          type: 'line',
          showSymbol: false,
        },
        {
          name: 'Average Market Returns',
          data: this.getReturns(indexData),
          type: 'line',
          showSymbol: false,
        },
      ],
    };
  }

  getReturns(closingData: number[]) {
    let returns: number[] = [];

    for (let index = 0; index < closingData.length; index++) {
      returns.push(
        +(
          ((closingData[index] - closingData[0]) / closingData[0]) *
          100
        ).toFixed(2)
      );
    }

    return returns;
  }
}
