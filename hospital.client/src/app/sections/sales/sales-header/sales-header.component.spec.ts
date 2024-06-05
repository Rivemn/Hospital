import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesHeaderComponent } from './sales-header.component';

describe('SalesHeaderComponent', () => {
  let component: SalesHeaderComponent;
  let fixture: ComponentFixture<SalesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
