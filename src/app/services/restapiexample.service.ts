import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { RestApiExampleResponse } from '../models/restApiExampleResponse.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    constructor(private http : HttpClient) { }    

    getEmployees(): Observable<RestApiExampleResponse<Employee[]>> {      
        return this.http.get<RestApiExampleResponse<Employee[]>>('https://dummy.restapiexample.com/api/v1/employees');
    }
    
    createEmployee(newEmployee: Employee): Observable<any> {
        return this.http.post('https://dummy.restapiexample.com/api/v1/create', newEmployee);
    }    
}