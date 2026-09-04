import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string | null;
  city: string | null;
}

export interface CreateEmployee {
  name: string;
  email: string;
  department: string;
  city: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8000/api/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    console.log('GET employees API called');

    return this.http.get<Employee[]>(this.apiUrl);
  }

  createEmployee(employee: CreateEmployee): Observable<Employee> {
    console.log('POST employee API called');

    return this.http.post<Employee>(
      this.apiUrl,
      employee
    );
  }

getEmployeeById(id: number): Observable<Employee> {

  console.log('GET employee by ID:', id);

  return this.http.get<Employee>(
    `${this.apiUrl}/${id}`
  );
}
}