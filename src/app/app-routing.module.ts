import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';
import { ProductsSortedComponent } from './components/products-sorted/products-sorted.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'employees', component: EmployeesTableComponent },
    { path: 'refresh-products', component: ProductsSortedComponent }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
