import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, Subject } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { FakestoreService } from 'src/app/services/fakestore.service';

@Component({
  selector: 'app-products-filtered-by-subject',
  templateUrl: './products-filtered-by-subject.component.html',
  styleUrls: ['./products-filtered-by-subject.component.scss']
})
export class ProductsFilteredBySubjectComponent implements OnInit {

  productsFiltered!:  Observable<Product[]>;
  categories!:        Observable<Category[]>;

  selectedCategorySubject: Subject<string> = new Subject<string>();
  selectedCategory: Observable<string> = this.selectedCategorySubject.asObservable();

  displayColumns : string[] = ['productImage','productTitle','productCategory','productPrice'];

  constructor(private fakestore: FakestoreService) {}

  ngOnInit(): void {
    this.categories = this.fakestore.getCategories();   
    this.productsFiltered = combineLatest([this.fakestore.getProducts(), this.selectedCategory])
                      .pipe( map( ([products, category] : [Product[], string]) => { return products.filter( (product: Product) => product.category === category) }));       
  }

  onCategoryChange(category: string) {    
    this.selectedCategorySubject.next(category);
  }

}
