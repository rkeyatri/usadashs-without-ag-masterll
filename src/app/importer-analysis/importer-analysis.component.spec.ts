import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporterAnalysisComponent } from './importer-analysis.component';

describe('ImporterAnalysisComponent', () => {
  let component: ImporterAnalysisComponent;
  let fixture: ComponentFixture<ImporterAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImporterAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImporterAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
