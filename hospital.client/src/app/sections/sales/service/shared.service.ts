import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private selectedCategorySource = new BehaviorSubject<string | null>(null);
  selectedCategory$ = this.selectedCategorySource.asObservable();

  private selectedItemSource = new BehaviorSubject<string | null>(null);
  selectedItem$ = this.selectedItemSource.asObservable();

  setSelectedCategory(category: string) {
    this.selectedCategorySource.next(category);
  }

  selectItem(itemName: string) {
    this.selectedItemSource.next(itemName);
  }
}

