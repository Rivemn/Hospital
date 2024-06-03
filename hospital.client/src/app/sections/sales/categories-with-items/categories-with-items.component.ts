import { Component, Input } from '@angular/core';

import { SubcategoriesService } from '../service/subcategories.service';
import { Subcategories } from '../models/Subcategories';
import { ItemsService } from '../service/items.service';
import { Items } from '../models/Items';
import { SharedService } from '../service/shared.service';
@Component({
  selector: 'app-categories-with-items',
  templateUrl: './categories-with-items.component.html',
  styleUrl: './categories-with-items.component.css'
})
export class CategoriesWithItemsComponent {

  selectedCategory: string ='Medicines and Preventive Products';
  selectedSubcategories: Set<string> = new Set<string>();
  items: Items[] = [];
  subcategories: Subcategories[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private subcategoryService: SubcategoriesService,
    private itemService: ItemsService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
   this.sharedService.selectedCategory$.subscribe(categoryName => {
      if (categoryName) {
        this.selectedCategory = categoryName;
      }
    });
    this.subcategoryService.getSubcategoriesByCategoryName(this.selectedCategory).subscribe(
      (subcategories) => {
        this.subcategories = subcategories;
        this.isLoading = false;
        console.log('Subcategories:', this.subcategories);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
        console.error('Error fetching subcategories:', error);
      }
    );
   
  }



  getSubcategoriesByCategoryId(categoryId: number): Subcategories[] {
    return this.subcategories.filter(subcategory => subcategory.categoryId === categoryId);
  }


  onCheckboxChange(event: Event, subcategory: Subcategories): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedSubcategories.add(subcategory.subcategoryName);
    } else {
      this.selectedSubcategories.delete(subcategory.subcategoryName);
    }
    console.log('Selected subcategories:', Array.from(this.selectedSubcategories));
    this.fetchItemsForSelectedSubcategories();
  }

  fetchItemsForSelectedSubcategories(): void {
    this.items = [];
    this.selectedSubcategories.forEach(subcategoryName => {
      this.itemService.getItemsBySubcategoryName(subcategoryName).subscribe(
        (items) => {
          this.items = this.items.concat(items);
          console.log(`Items for ${subcategoryName}:`, items);
        },
        (error) => {
          this.errorMessage = error;
          console.error(`Error fetching items for ${subcategoryName}:`, error);
        }
      );
    });
  }
  onItemClick(itemName: string) {
    this.sharedService.selectItem(itemName);
  }




}
