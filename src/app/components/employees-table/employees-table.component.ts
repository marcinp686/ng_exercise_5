import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay, switchMap } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/restapiexample.service';
import { SortOrder } from 'src/app/models/sort-order.model'
import { AgeFilter } from 'src/app/models/age-filter.model';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {

  ageFilters: Array<AgeFilter> = [
    {desc: 'All', min: 0, max: 100},
    {desc: '0-20', min: 0, max: 20},
    {desc: '21-30', min: 21, max: 30},
    {desc: '31-40', min: 31, max: 40},
    {desc: '41-50', min: 41, max: 40},
    {desc: '51-100', min: 51, max: 100}
  ]

  sortingOrders:  Array<SortOrder> = [
    {description: 'Ascending', order: 'asc'},
    {description: 'Descending', order: 'desc'}
  ];

  selectedFilter      : BehaviorSubject<AgeFilter> = new BehaviorSubject(this.ageFilters[0]);
  selectedSorting     : BehaviorSubject<SortOrder> = new BehaviorSubject(this.sortingOrders[0]);
  filteredEmployees!  : Observable<Employee[]>;
  sortedEmployees!    : Observable<Employee[]>;
  filterSelectionList : string[] = [this.ageFilters[0].desc]
  sortSelectionList   : string[] = [this.sortingOrders[0].order];
  refresher           : BehaviorSubject<void> = new BehaviorSubject<void>(void 0);

  displayColumns : string[] = ['employeeId','employeeName','employeeSalary','employeeAge','employeeImage','employeeActions'];

  constructor(private restApi: EmployeeService) { }

  ngOnInit(): void {
    this.filteredEmployees = this.refresher.pipe(switchMap(() => combineLatest([this.restApi.getEmployees(), this.selectedFilter])
      .pipe(map(([response, filter]: [Employee[], AgeFilter]) => {
        return response.filter((employee: Employee) => {
          return employee.employee_age >= filter.min && employee.employee_age <= filter.max
        })
      }))));

    this.sortedEmployees = combineLatest([this.filteredEmployees, this.selectedSorting])
      .pipe(map(([employee, order]: [Employee[], SortOrder]) => {
        return employee.sort(this.sortEmployeesFunc(order))
      }),
        shareReplay()
      )       
  }
;
  onAgeFilterChange(filter: AgeFilter) : void {
    this.selectedFilter.next(filter);
  }

  
  private sortEmployeesFunc(order: SortOrder): ((a: Employee, b: Employee) => number) | undefined {
    return (a, b) => {
      if (a.employee_salary > b.employee_salary)
        return order.order === 'asc' ? 1 : -1;
      if (a.employee_salary < b.employee_salary)
        return order.order === 'desc' ? 1 : -1;
      return 0;
    };
  }

  onSortingOrderChange(order: SortOrder) : void {
    this.selectedSorting.next(order);
  }

  deleteEmployee(id: number) : void {
    this.restApi.deleteEmployee(id).subscribe(
      {
        complete: () => this.refresher.next()
      }
    );
  }
}
