import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Chart, ChartData } from "chart.js";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"],
})
export class PieChartComponent implements OnInit {
  chartForm!: FormGroup;

  ngOnInit(): void {
    this.chartForm = new FormGroup({
      portfolio: new FormArray([]),
    });
  }

  pieChartData: ChartData | null = null;

  pieChartOptions = {
    responsive: false,
  };

  onAddCompany(): void {
    const group = new FormGroup({
      company: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });

    (<FormArray>this.chartForm.get("portfolio")).push(group);
  }

  getControls() {
    return (<FormArray>this.chartForm.get("portfolio")).controls;
  }

  deleteGroup(index: number) {
    (<FormArray>this.chartForm.get("portfolio")).removeAt(index);
  }

  onSubmit() {
    let amounts: number[] = [];
    let companies: string[] = [];
    let totalAmount = 0;

    for (let i = 0; i < this.chartForm.value["portfolio"].length; i++) {
      let amount: number = this.chartForm.value["portfolio"][i]["amount"];
      totalAmount += amount;
    }

    for (let i = 0; i < this.chartForm.value["portfolio"].length; i++) {
      let amount: number = this.chartForm.value["portfolio"][i]["amount"];
      let company: string = this.chartForm.value["portfolio"][i]["company"];
      amounts.push(+((amount / totalAmount) * 100).toFixed(2));
      companies.push(company);
    }

    this.setPieChartData(companies, amounts);
  }

  setPieChartData(labels: string[], data: number[]) {
    if (labels.length === 0) {
      this.pieChartData = null;
      return;
    }

    this.pieChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          label: "Portfolio Percent",
          backgroundColor: [
            "rgba(255, 0, 25, 0.7)",
            "rgba(0, 255, 25, 0.7)",
            "rgba(0, 25, 255, 0.7)",
            "rgba(67, 25, 255, 0.7)",
            "rgba(67, 25, 78, 0.7)",
            "rgba(167, 125, 78, 0.7)",
            "rgba(67, 255, 178, 0.7)",
          ],
        },
      ],
    };
  }
}
