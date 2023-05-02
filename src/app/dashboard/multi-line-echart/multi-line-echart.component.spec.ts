import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLineEchartComponent } from './multi-line-echart.component';

describe('MultiLineEchartComponent', () => {
  let component: MultiLineEchartComponent;
  let fixture: ComponentFixture<MultiLineEchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiLineEchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiLineEchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
