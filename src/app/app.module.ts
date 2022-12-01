import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select'
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table'

import { ProductsFilteredByRouteComponent } from './components/products-filtered-by-route/products-filtered-by-route.component';
import { ProductsFilteredBySubjectComponent } from './components/products-filtered-by-subject/products-filtered-by-subject.component';
import { ProductsSortedComponent } from './components/products-sorted/products-sorted.component';
import { EmployeesTableComponent } from './components/employees-table/employees-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsFilteredByRouteComponent,
    ProductsFilteredBySubjectComponent,
    ProductsSortedComponent,
    EmployeesTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
