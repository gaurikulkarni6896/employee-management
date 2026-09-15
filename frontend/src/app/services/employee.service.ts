import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../employee';

export interface CreateEmployee {

  name: string;

  email: string;

  department: string | null;

  city: string | null;

}

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

    console.log(
      'GET employees API called'
    );

    return this.http.get<Employee[]>(
      this.apiUrl
    );

  }


  createEmployee(
    employee: CreateEmployee
  ): Observable<Employee> {

    return this.http.post<Employee>(
      this.apiUrl,
      employee
    );

  }

}