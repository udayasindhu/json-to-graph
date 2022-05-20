import { Component, OnInit } from "@angular/core";
import CanvasJS from "../assets/canvasjs.min";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get("../assets/repo.json").subscribe(data => {
      let chartData = this.getChartData(data);
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
          text: "Data visualization"
        },
        axisX: {
          title: "Dates"
        },
        axisY: {
          title: "Avg Speed"
        },
        data: [
          {
            type: "column",
            dataPoints: chartData
          }
        ]
      });
      chart.render();
    });
  }

  getChartData(jsonData) {
    let dataPoints = [];
    for (var i = 0; i < jsonData.length; i++) {
      dataPoints.push({
        label: jsonData[i].date,
        y: Number(jsonData[i].speed)
      });
    }
    return dataPoints;
  }
}
