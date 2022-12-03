import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { FakestoreService } from 'src/app/services/fakestore.service';
import { SortOrder } from 'src/app/models/sort-order.model';

@Component({
  selector: 'app-products-sorted',
  templateUrl: './products-sorted.component.html',
  styleUrls: ['./products-sorted.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsSortedComponent implements OnInit {

  sortingOrders       :  Array<SortOrder> = [
    {description: 'Ascending', order: 'asc'},
    {description: 'Descending', order: 'desc'}
  ];
  
  sortSelectionList   : Array<SortOrder> = [this.sortingOrders[0]];  

  productsSorted!     : Observable<Product[]>;
  sortingOrderSubject : BehaviorSubject<SortOrder> = new BehaviorSubject(this.sortingOrders[0]);  
  refresher           : BehaviorSubject<void> = new BehaviorSubject<void>(void 0);

  displayColumns      : string[] = ['productImage', 'productTitle', 'productCategory', 'productPrice', 'actions'];

  constructor(private fakestore: FakestoreService) { }

  ngOnInit(): void {
    this.productsSorted = this.refresher.pipe(
      switchMap(() =>
        combineLatest([
          this.fakestore.getProducts(),
          this.sortingOrderSubject,
        ]).pipe(
          map(([products, order]: [Product[], SortOrder]) => {
            return products.sort(this.sortProductsByPriceFunc(order));
          })
        )
      ),
      shareReplay()
    );
  }

  private sortProductsByPriceFunc(order: SortOrder): ((a: Product, b: Product) => number) | undefined {
    return (a, b) => {
      if (a.price > b.price)
        return order.order === 'asc' ? 1 : -1;
      if (a.price < b.price)
        return order.order === 'desc' ? 1 : -1;
      return 0;
    };
  }

  onSort(order: SortOrder): void {
    this.sortingOrderSubject.next(order);
  }

  deleteProduct(id: number): void {
    this.fakestore.deleteProduct(id).subscribe({
      complete: () => this.refresher.next()
    });
  }
}
