import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { HomeComponent } from "./home/home.component";
import { NgxEchartsModule } from "ngx-echarts";
import { NgChartsModule } from "ng2-charts";
import { LineEchartComponent } from "./line-echart/line-echart.component";
import { PieChartComponent } from "./pie-chart/pie-chart.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MultiLineEchartComponent } from "./multi-line-echart/multi-line-echart.component";
import { MultiBarEchartComponent } from "./multi-bar-echart/multi-bar-echart.component";

@NgModule({
  declarations: [
    HomeComponent,
    LineEchartComponent,
    PieChartComponent,
    MultiLineEchartComponent,
    MultiBarEchartComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    NgChartsModule,
  ],
})
export class DashboardModule {}
