import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Categories {
  categoryName: string;
}
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {
  public categories: Categories[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
   
    this.getCategories();
  }

  getCategories() {
    this.http.get<Categories[]>('/api/categories').subscribe(

      (result) => {
        this.categories = result;
        console.log(this.categories[0].categoryName);
        console.log(this.categories[1].categoryName);
        console.log(this.categories[2].categoryName);

      },
      (error) => {
        console.error(error);
      }
    );
  }
}
