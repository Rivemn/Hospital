import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../service/categories.service';
import { Subcategories } from '../models/Subcategories';

import { Categories } from '../models/Categories';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Categories[] = [];
  subcategories: Subcategories[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
       
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
        console.error('Error fetching categories:', error);
      }
    );

    this.categoryService.getSubcategories().subscribe(
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

