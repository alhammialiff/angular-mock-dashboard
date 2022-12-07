import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitiesChartComponent } from './utilities-chart.component';

describe('UtilitiesChartComponent', () => {
  let component: UtilitiesChartComponent;
  let fixture: ComponentFixture<UtilitiesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilitiesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilitiesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
