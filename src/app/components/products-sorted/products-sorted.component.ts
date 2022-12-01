import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { FakestoreService } from 'src/app/services/fakestore.service';

@Component({
  selector: 'app-products-sorted',
  templateUrl: './products-sorted.component.html',
  styleUrls: ['./products-sorted.component.scss']
})
export class ProductsSortedComponent implements OnInit {

  productsSorted!:    Observable<Product[]>;
  
  sortingOrderSubject: BehaviorSubject<string> = new BehaviorSubject('asc');
  
  displayColumns : string[] = ['productImage','productTitle','productCategory','productPrice'];

  sortingOrders: Observable<Array<string>> = of(['asc','desc']);

  constructor(private fakestore: FakestoreService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productsSorted = combineLatest([this.fakestore.getProducts(), this.sortingOrderSubject])
                      .pipe( map( ([products, order]:[Product[], string]) =>  { return products.sort( this.sortProductsByPriceFunc(order) ) } ));
  }

  private sortProductsByPriceFunc(order: string): ((a: Product, b: Product) => number) | undefined {
    return (a, b) => {
      if (a.price > b.price)
        return order === 'asc' ? 1 : -1;
      if (a.price < b.price)
        return order === 'desc' ? 1 : -1;
      return 0;
    };
  }

  onSort(order: string) : void {
    this.sortingOrderSubject.next(order);
  }
}
