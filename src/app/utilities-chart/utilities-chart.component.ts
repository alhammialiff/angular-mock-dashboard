import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Utilities } from '../shared/utilities';
import { UtilitiesService } from '../services/utilities.service';
import * as d3 from 'd3';
import { createViewChild } from '@angular/compiler/src/core';

@Component({
  selector: 'app-utilities-chart',
  templateUrl: './utilities-chart.component.html',
  styleUrls: ['./utilities-chart.component.scss']
})
export class UtilitiesChartComponent implements OnInit {

  utilities: Utilities[];
  selectedGraph: any;

  public electricitySVG;
  public gasSVG;
  public waterSVG;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  // @ViewChild('electricGraph') divElectricityGraph: ElementRef;
  // @ViewChild('gasGraph') divGasGraph: ElementRef;
  // @ViewChild('waterGraph') divWaterGraph: ElementRef;


  constructor(private utilitiesService: UtilitiesService) { }

  ngOnInit() {
    this.utilitiesService.getUtilities()
      .subscribe((utilities) => {
        this.utilities = utilities;

        // Renders Electricity Graph on init so that default active tab displays it
        this.createElectricityUsageSVG();
        this.drawElectricityUsageLines(this.utilities);
      })
  }



  // Renders D3 graph SVGs when tab is clicked via captured tab change event (selectedTabChange)
  // Issue Resolved: Added D3 graph divs within <mat-tab> does not render inactive tabs on init
  //                 Issue resolved by accessing mat-tab-group event (selectedTabChange) and render
  //                 respective graph based on the tab clicked
  toggleGraph(event: any): void {
    console.log(event.index);

    // Captures Tab Change event and identify current active tab index
    if ((event.index === 0)) {

      // If SVG is not yet created, render respective graph
      if (!document.getElementById('electricity-usage-graph-svg')) {
        this.createElectricityUsageSVG();
        this.drawElectricityUsageLines(this.utilities);
      }

    } else if (event.index === 1) {
      
      if (!document.getElementById('gas-usage-graph-svg')) {
        this.createGasUsageSVG();
        this.drawGasUsageLines(this.utilities);
      }

    } else if (event.index === 2) {
      
      if (!document.getElementById('water-usage-graph-svg')) {
        this.createWaterUsageSVG();
        this.drawWaterUsageLines(this.utilities);
      }

    }


  }

  private createElectricityUsageSVG(): void {
    this.electricitySVG = d3.select('div#electricity-usage-graph')
      .append('svg')
      .attr('id', "electricity-usage-graph-svg")
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ")");
  }

  private drawElectricityUsageLines(data: any[]): void {

    const x = d3.scalePoint()
      .range([0, this.width])
      .domain(data.map(d => d.date));

    this.electricitySVG.append('g')
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0])

    this.electricitySVG.append("g")
      .call(d3.axisLeft(y));

    // Electric Usage line path
    this.electricitySVG.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.electricityUsage) }));

    // Electric Usage data point
    this.electricitySVG.select("electricityUsageDataPoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", "black")
      .attr("stroke", "green")
      .attr("cx", function (d) { return x(d.date) })
      .attr("cy", function (d) { return y(d.electricityUsage) })
      .attr("r", 3)

  }

  private createGasUsageSVG(): void {
    this.gasSVG = d3.select('div#gas-usage-graph')
      .append('svg')
      .attr('id', "gas-usage-graph-svg")
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ")");
  }

  private drawGasUsageLines(data: any[]): void {

    const x = d3.scalePoint()
      .range([0, this.width])
      .domain(data.map(d => d.date));

    this.gasSVG.append('g')
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0])

    this.gasSVG.append("g")
      .call(d3.axisLeft(y));

    // Gas Usage line path
    this.gasSVG.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.gasUsage) }));

    // Gas Usage data point
    this.gasSVG.selectAll("gasUsageDataPoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", "green")
      .attr("stroke", "orange")
      .attr("cx", function (d) {
        return x(d.date)
      })
      .attr("cy", function (d) {
        return y(d.gasUsage)
      })
      .attr("r", 3);

  }

  private createWaterUsageSVG(): void {
    this.waterSVG = d3.select('figure#water-usage-graph')
      .append('svg')
      .attr('id', "water-usage-graph-svg")
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ")");
  }

  private drawWaterUsageLines(data: any[]): void {

    const x = d3.scalePoint()
      .range([0, this.width])
      .domain(data.map(d => d.date));

    this.waterSVG.append('g')
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear()
      .domain([0, 100])
      .range([this.height, 0])

    this.waterSVG.append("g")
      .call(d3.axisLeft(y));


    // Water Usage line path
    this.waterSVG.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "blue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d.waterUsage) });

    this.waterSVG.selectAll("waterUsageDataPoint")
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", "black")
      .attr("stroke", "blue")
      .attr("cx", function (d) {
        return x(d.date)
      })
      .attr("cy", function (d) {
        return y(d.waterUsage)
      })
      .attr("r", 3);


  }


  private createUtilitiesUsageSVG(): void {

  }

}
