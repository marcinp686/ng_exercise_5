import { Component, OnInit } from '@angular/core';
import { PunkapiService } from 'src/app/services/punkapi.service';
import { PageEvent } from '@angular/material/paginator'
import { BehaviorSubject, combineLatestWith, concatMap, map, Observable } from 'rxjs';
import { Beer } from 'src/app/models/beer.model';

interface PagOpt {
  page:     number;
  per_page: number;
}

@Component({
  selector: 'app-beers-list',
  templateUrl: './beers-list.component.html',
  styleUrls: ['./beers-list.component.scss']
})
export class BeersListComponent implements OnInit { 
  
  beers!:         Observable<Beer[]>;  
  paginatorOpts:  BehaviorSubject<PagOpt> = new BehaviorSubject({page: 1, per_page: 5});

  constructor(private punkApi: PunkapiService) { }

  ngOnInit(): void {
    this.beers = this.paginatorOpts.pipe( concatMap( (opts: PagOpt) => { return this.punkApi.getBeers(opts.page, opts.per_page) }) );    
  }

  onPaginatorChange(event: PageEvent) {
    this.paginatorOpts.next({page: event.pageIndex+1, per_page: event.pageSize});  
  }

}
