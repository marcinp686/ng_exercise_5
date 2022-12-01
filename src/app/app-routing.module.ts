import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsFilteredByRouteComponent } from './components/products-filtered-by-route/products-filtered-by-route.component';
import { ProductsFilteredBySubjectComponent } from './components/products-filtered-by-subject/products-filtered-by-subject.component';
import { ProductsSortedComponent } from './components/products-sorted/products-sorted.component';

@NgModule({
  imports: [RouterModule.forRoot([
      { path: 'products', component: ProductsSortedComponent },
    //  { path: 'products', component: ProductsFilteredBySubjectComponent },
  //  { path: 'products/:category', component: ProductsFilteredByRouteComponent }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
