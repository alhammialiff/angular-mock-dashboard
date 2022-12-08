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

  // Need three SVG
  // Need three drawLine functions (gas, water, elec)
  // Create a tab for each graph

  ngOnInit() {
    this.utilitiesService.getUtilities()
      .subscribe((utilities) => {
        this.utilities = utilities;
        this.createElectricityUsageSVG();
        this.drawElectricityUsageLines(this.utilities);
        this.createGasUsageSVG();
        this.drawGasUsageLines(this.utilities);
        this.createWaterUsageSVG();
        this.drawWaterUsageLines(this.utilities);
        console.log(this.utilities)
      })
  }

  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private createElectricityUsageSVG(): void {
    this.svg = d3.select('figure#electricity-usage-graph')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.height * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ")");
  }

  private drawElectricityUsageLines(data: any[]): void {

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

    // Electric Usage line path
    this.svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.electricityUsage) });

    // Electric Usage data point
    this.svg.selectAll("electricityUsageDataPoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", "black")
      .attr("stroke", "green")
      .attr("cx", function (d) { return x(d.date) })
      .attr("cy", function (d) { return y(d.electricityUsage) })
      .attr("r", 3)

    // Gas Usage line path
    this.svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.gasUsage) });

    // Gas Usage data point
    this.svg.selectAll("gasUsageDataPoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill","green")
      .attr("stroke","orange")
      .attr("cx",function(d){
        return x(d.date)
      })
      .attr("cy", function(d){
        return y(d.gasUsage)
      })
      .attr("r",3);

    // Water Usage line path
    this.svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.waterUsage) });

    this.svg.selectAll("waterUsageDataPoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill","black")
      .attr("stroke","blue")
      .attr("cx", function(d){
        return x(d.date)
      })
      .attr("cy", function(d){
        return y(d.waterUsage)
      })
      .attr("r",3);


  }

  private createGasUsageSVG(): void {
    this.svg = d3.select('figure#gas-usage-graph')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.height * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ")");
  }

  private drawGasUsageLines(data: any[]): void {

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

    // Electric Usage line path
    this.svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.electricityUsage) });

    // Electric Usage data point
    this.svg.selectAll("electricityUsageDataPoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", "black")
      .attr("stroke", "green")
      .attr("cx", function (d) { return x(d.date) })
      .attr("cy", function (d) { return y(d.electricityUsage) })
      .attr("r", 3)

    // Gas Usage line path
    this.svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.gasUsage) });

    // Gas Usage data point
    this.svg.selectAll("gasUsageDataPoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill","green")
      .attr("stroke","orange")
      .attr("cx",function(d){
        return x(d.date)
      })
      .attr("cy", function(d){
        return y(d.gasUsage)
      })
      .attr("r",3);

    // Water Usage line path
    this.svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.waterUsage) });

    this.svg.selectAll("waterUsageDataPoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill","black")
      .attr("stroke","blue")
      .attr("cx", function(d){
        return x(d.date)
      })
      .attr("cy", function(d){
        return y(d.waterUsage)
      })
      .attr("r",3);


  }

  private createWaterUsageSVG(): void {
    this.svg = d3.select('figure#water-usage-graph')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.height * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ")");
  }

  private drawWaterUsageLines(data: any[]): void {

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

    // Electric Usage line path
    this.svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.electricityUsage) });

    // Electric Usage data point
    this.svg.selectAll("electricityUsageDataPoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", "black")
      .attr("stroke", "green")
      .attr("cx", function (d) { return x(d.date) })
      .attr("cy", function (d) { return y(d.electricityUsage) })
      .attr("r", 3)

    // Gas Usage line path
    this.svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.gasUsage) });

    // Gas Usage data point
    this.svg.selectAll("gasUsageDataPoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill","green")
      .attr("stroke","orange")
      .attr("cx",function(d){
        return x(d.date)
      })
      .attr("cy", function(d){
        return y(d.gasUsage)
      })
      .attr("r",3);

    // Water Usage line path
    this.svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.waterUsage) });

    this.svg.selectAll("waterUsageDataPoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill","black")
      .attr("stroke","blue")
      .attr("cx", function(d){
        return x(d.date)
      })
      .attr("cy", function(d){
        return y(d.waterUsage)
      })
      .attr("r",3);


  }


  private createUtilitiesUsageSVG(): void {

  }

}
