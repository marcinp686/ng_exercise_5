import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { FakestoreService } from 'src/app/services/fakestore.service';

@Component({
  selector: 'app-products-filtered-by-route',
  templateUrl: './products-filtered-by-route.component.html',
  styleUrls: ['./products-filtered-by-route.component.scss']
})
export class ProductsFilteredByRouteComponent implements OnInit {

  public products!:    Observable<Product[]>;
  public categories!:  Observable<Category[]>;

  displayColumns : string[] = ['productImage','productTitle','productCategory','productPrice'];

  constructor(private fakestore: FakestoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories = this.fakestore.getCategories();
    this.products = combineLatest([this.fakestore.getProducts(), this.route.params])
      .pipe( map( ([products, params] : [Product[], Params]) => { return products.filter( (product : Product) => product.category===params['category'] ) } ) )
  }

}
