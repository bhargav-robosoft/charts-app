import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { LineEchartService } from '../line-echart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-line-echart',
  templateUrl: './line-echart.component.html',
  styleUrls: ['./line-echart.component.css'],
})
export class LineEchartComponent implements OnInit {
  chartOption!: EChartsOption;

  dataSub!: Subscription;
  labelsSub!: Subscription;
  ticksSub!: Subscription;

  type: 'ytd' | 'oneYear' | 'threeYear' | 'fiveYear' = 'ytd';
  data!: number[];
  labels!: string[];
  ticks!: { [key: string]: string };

  constructor(private lineEchartService: LineEchartService) {}

  ngOnInit(): void {
    this.dataSub = this.lineEchartService.$data.subscribe((data) => {
      this.data = data;
    });
    this.labelsSub = this.lineEchartService.$labels.subscribe((labels) => {
      this.labels = labels;
    });
    this.ticksSub = this.lineEchartService.$ticks.subscribe((ticks) => {
      this.ticks = ticks;
    });

    this.lineEchartService.loadInitialData();
    this.setChartData();
  }

  setChartData() {
    this.chartOption = {
      xAxis: {
        axisLabel: {
          rotate: 50,
          formatter: (value: string, index: number) => {
            if (this.ticks[value]) {
              return this.ticks[value];
            } else {
              return '';
            }
          },
          interval: (index, value) => {
            if (this.ticks[value]) {
              return true;
            } else {
              return false;
            }
          },
        },
        axisTick: {
          show: true,
          interval: (index, value) => {
            if (this.ticks[value]) {
              return true;
            } else {
              return false;
            }
          },
        },
        type: 'category',
        data: this.labels.reverse(),
      },
      yAxis: {
        type: 'value',
        min: function (value) {
          return value.min - 20;
        },
      },
      title: {
        text: 'ICICI BANK',
      },
      tooltip: {
        trigger: 'axis',
      },
      series: [
        {
          data: this.data.reverse(),
          type: 'line',
          showSymbol: false,
        },
      ],
    };
  }

  changeData(type: 'ytd' | 'oneYear' | 'threeYear' | 'fiveYear') {
    this.type = type;
    this.lineEchartService.loadYearData(type);
    this.setChartData();
  }
}
