import { Component } from '@angular/core';

import { SubcategoriesService } from '../service/subcategories.service';
import { Subcategories } from '../models/Subcategories';


@Component({
  selector: 'app-categories-with-items',
  templateUrl: './categories-with-items.component.html',
  styleUrl: './categories-with-items.component.css'
})
export class CategoriesWithItemsComponent {

  selectedCategory: string ='Medicines and Preventive Products';

  subcategories: Subcategories[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private subcategoryService: SubcategoriesService
  ) { }

  ngOnInit(): void {
  
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
}
