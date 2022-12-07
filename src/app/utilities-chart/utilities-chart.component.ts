import { Component, OnInit } from '@angular/core';
import { Utilities } from '../shared/utilities';
import { UtilitiesService } from '../services/utilities.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-utilities-chart',
  templateUrl: './utilities-chart.component.html',
  styleUrls: ['./utilities-chart.component.scss']
})
export class UtilitiesChartComponent implements OnInit {
  utilities: Utilities[];
  constructor(private utilitiesService: UtilitiesService) { }

  ngOnInit() {
    this.utilitiesService.getUtilities()
      .subscribe((utilities) => {
        this.utilities = utilities;
        this.createSVG();
        this.drawLines(this.utilities);
        console.log(this.utilities)
      })
  }

  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private createSVG(): void {
    this.svg = d3.select('figure#line')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.height * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ")");
  }

  private drawLines(data: any[]): void {

    const x = d3.scalePoint()
      .range([0, this.width])
      .domain(data.map(d => d.date));

    this.svg.append('g')
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0])

    this.svg.append("g")
      .call(d3.axisLeft(y));

    this.svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.electricityUsage) });

    this.svg.selectAll("datapoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", "green")
      .attr("stroke", "none")
      .attr("cx", function (d) { return x(d.date) })
      .attr("cy", function (d) { return y(d.electricityUsage) })
      .attr("r", 3)

  }

}
