import { Component, OnInit } from '@angular/core';
import { SpendingService } from '../services/spending.service';
import { ScreenSizeService } from '../services/screen-size.service';
import { Spending } from '../shared/spending';
import * as d3 from 'd3';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-spending-chart',
  templateUrl: './spending-chart.component.html',
  styleUrls: ['./spending-chart.component.scss']
})
export class SpendingChartComponent implements OnInit {

  spending: Spending[];
  screenRes: any[];
  isMobile$ = this.screenSizeService.isMobile$;
  private innerWidth;
  private innerHeight;
  private svg;
  private margin;
  private width;
  private height;
  

  constructor(private spendingService: SpendingService,
    private screenSizeService: ScreenSizeService,
    private appComponent: AppComponent) { }

  ngOnInit() {

    this.spendingService.getSpending()
      .subscribe((spending) => {
        this.spending = spending;
        this.createSVG();
        console.log(this.spending);
        this.drawBars(this.spending);
        this.highlightBar();
      });

    // Listen to innerWidth on resize event
    this.innerWidth = this.screenSizeService.innerWidth$.subscribe(
      (observable) => console.log(observable)
    );

    // Listen to innerHeight on resize event
    this.innerHeight = this.screenSizeService.innerHeight$.subscribe(
      (observable) => console.log(observable)
    );
      
  }
    
  if(){

  }
  private svg;
  private margin = 50;
  private width = 730 - (this.margin * 2);
  private height = 300 - (this.margin * 2);

  private createSVG(): void {

    // this.svg = d3.select('figure#spending-chart')
    //   .append('svg')
    //   .attr('width', this.width + (this.margin * 2))
    //   .attr('height', this.height + (this.height * 2))
    //   .append("g")
    //   .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
    this.svg = d3.select('div#spending-chart')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.height * 2))
      .attr('preserveAspectRatio', "xMidYMid meet")
      .attr("viewBox","0 0 720 260")
      .append("g");
      
  }

  private drawBars(data: any[]): void {

    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.date))

    this.svg.append("g")
      .attr("transform", "translate(" + this.margin  + "," + (this.height + this.margin) + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear()
      .domain([0, 2000])
      .range([this.height, 0]);

    this.svg.append("g")
      .call(d3.axisLeft(y))
      .attr("transform", "translate(" + this.margin  + "," + 50 + ")");

    this.svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.date))
      .attr("y", d => y(d.thisMonth))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d.thisMonth))
      .attr("transform", "translate(50," + 50 + ")")
      .attr("fill", "#d04a35");
  }

  private highlightBar(): void{
    d3.selectAll("rect")
      .on("mouseover", function(){
        d3.select(this)
          .style("fill", "rgb(230, 74, 53)");

          console.log("Click");

      })
      .on("mouseout", function(){
        d3.select(this)
          .style("fill", "rgb(208, 74, 53)")
      });
  }

}
