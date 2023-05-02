import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiBarEchartComponent } from './multi-bar-echart.component';

describe('MultiBarEchartComponent', () => {
  let component: MultiBarEchartComponent;
  let fixture: ComponentFixture<MultiBarEchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiBarEchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiBarEchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
