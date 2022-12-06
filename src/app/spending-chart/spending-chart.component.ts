import { Component, OnInit } from '@angular/core';
import { SpendingService } from '../services/spending.service';
import { Spending } from '../shared/spending';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-spending-chart',
  templateUrl: './spending-chart.component.html',
  styleUrls: ['./spending-chart.component.scss']
})
export class SpendingChartComponent implements OnInit {

  spending: Spending[];

  constructor(private spendingService: SpendingService) { }

  ngOnInit() {
    this.spendingService.getSpending()
      .subscribe((spending) => {
        this.spending = spending;
        this.createSVG();
        console.log(this.spending);
        this.drawBars(this.spending);
      });

  }

  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private createSVG(): void {
    this.svg = d3.select('figure#bar')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.height * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {

    const x = d3Scale.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.date))

    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3Scale.scaleLinear()
      .domain([0, 2000])
      .range([this.height, 0]);

    this.svg.append("g")
      .call(d3Axis.axisLeft(y));

    this.svg.selectAll("bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.date))
      .attr("y", d => y(d.thisMonth))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d.thisMonth))
      .attr("fill", "#d04a35");
  }

}
