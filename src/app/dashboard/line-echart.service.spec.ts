import { TestBed } from '@angular/core/testing';

import { LineEchartService } from './line-echart.service';

describe('LineEchartService', () => {
  let service: LineEchartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineEchartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
