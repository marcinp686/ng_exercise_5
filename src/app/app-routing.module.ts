import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsFilteredByRouteComponent } from './components/products-filtered-by-route/products-filtered-by-route.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'products', component: ProductsFilteredByRouteComponent },
    { path: 'products/:category', component: ProductsFilteredByRouteComponent }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
