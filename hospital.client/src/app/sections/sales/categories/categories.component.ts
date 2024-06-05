import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../service/categories.service';
import { SubcategoriesService } from '../service/subcategories.service';
import { SharedService } from '../service/shared.service';

import { Subcategories } from '../models/Subcategories';

import { Categories } from '../models/Categories';


@Component({
  selector: 'app-sales-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  selectedSubcategory: string|undefined;

  categories: Categories[] = [];
  subcategories: Subcategories[] = [];

  errorMessage: string | null = null;

  constructor(private categoryService: CategoriesService,
    private subcategoryService: SubcategoriesService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
       
      },
      (error) => {
        this.errorMessage = error;
        
        console.error('Error fetching categories:', error);
      }
    );

    this.subcategoryService.getSubcategories().subscribe(
      (subcategories) => {
        this.subcategories = subcategories;
       
        console.log('Subcategories:', this.subcategories);
      },
      (error) => {
        this.errorMessage = error;
        
        console.error('Error fetching subcategories:', error);
      }
    );
  }

  getSubcategoriesByCategoryId(categoryId: number): Subcategories[] {
    return this.subcategories.filter(subcategory => subcategory.categoryId === categoryId);
  }
  onCategoryClick(categoryName: string) {

    this.sharedService.setSelectedCategory(categoryName);
    console.log('Selected Category:', categoryName);
  }
}

