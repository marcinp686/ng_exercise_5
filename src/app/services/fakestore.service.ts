import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FakestoreService {

  private productsUrl : string = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) { }

  // Products data --------------------
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl+'/products');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.productsUrl+`/products/${id}`);
  }
  
  createProduct(product: Product) : Observable<any> {  
    return this.http.post(this.productsUrl, product);
  }

  deleteProduct(id: number) : Observable<any> {
    return this.http.delete(this.productsUrl+`/products/${id}`)
  }

  // User data --------------------
  getUser(id: number) : Observable<User> {
    return this.http.get<User>(this.productsUrl+`/users/${id}`);
  }

  createUser(user: User) : Observable<any> {       
    return this.http.post(this.productsUrl+'/users', user);
  }

  userLogin(user: User) : Observable<any> {
    return this.http.post(this.productsUrl+'/auth/login', user);
  }

  // Categories data --------------------
  getCategories(): Observable<Category[]> {
    return this.http.get<string[]>(this.productsUrl+'/products/categories')
      .pipe(map( (categories: string[]) => categories.map(
        (category: string) => {const res: Category = { name: category }; return res;})))
  }

  // Cart data --------------------
  getCart(id: number) : Observable<Cart> {
    return this.http.get<Cart>(this.productsUrl+`/carts/${id}`);
  }

}
