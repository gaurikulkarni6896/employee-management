import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl =
    'http://localhost:8000/api/employees';

  constructor(
    private http: HttpClient
  ) {}

  getEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(
      this.apiUrl
    );
  }

  createEmployee(
    employee: Employee
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      employee
    );
  }

  updateEmployee(
    id: number,
    employee: Employee
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      employee
    );
  }

  deleteEmployee(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}