import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesWithItemsComponent } from './categories-with-items.component';

describe('CategoriesWithItemsComponent', () => {
  let component: CategoriesWithItemsComponent;
  let fixture: ComponentFixture<CategoriesWithItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesWithItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesWithItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
