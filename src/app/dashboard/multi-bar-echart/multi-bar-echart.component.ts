import { Component } from "@angular/core";
import { EChartsOption } from "echarts";

@Component({
  selector: "app-multi-bar-echart",
  templateUrl: "./multi-bar-echart.component.html",
  styleUrls: ["./multi-bar-echart.component.css"],
})
export class MultiBarEchartComponent {
  chartOption!: EChartsOption;

  constructor() {}

  ngOnInit(): void {
    this.setChartData();
  }

  setChartData() {
    this.chartOption = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
      },
      legend: {
        data: ["Portfolio", "S&P 500 TR"],
      },
      xAxis: {
        axisTick: {
          show: true,
        },
        type: "category",
        data: ["YTD", "1 yr", "3 yrs", "5 yrs", "Inc."],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Portfolio",
          data: [24, -4, 15, 7, 6],
          type: "bar",
          color: "rgb(112, 112, 112)",
          
        },
        {
          name: "S&P 500 TR",
          data: [9, -2, 21, 13, 9],
          type: "bar",
          color: "rgb(45, 45, 45)",
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
