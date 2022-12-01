import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Beer } from '../models/beer.model';

@Injectable({
  providedIn: 'root'
})
export class PunkapiService {

  constructor(private httpClient: HttpClient) { }

  getBeers(page: number, per_page: number) : Observable<Beer[]> {
    return this.httpClient.get<Beer[]>(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${per_page}`);
  }
}
