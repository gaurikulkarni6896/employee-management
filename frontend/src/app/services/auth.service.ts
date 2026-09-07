import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoggedInUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  message: string;
  user: LoggedInUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api/auth';

  constructor(
    private http: HttpClient
  ) {}

  login(
    email: string,
    password: string
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      {
        email,
        password
      }
    ).pipe(

      tap((response: LoginResponse) => {

        console.log(
          'Saving logged-in user:',
          response.user
        );

        localStorage.setItem(
          'currentUser',
          JSON.stringify(response.user)
        );

      })

    );
  }


  getCurrentUser(): LoggedInUser | null {

    const user = localStorage.getItem(
      'currentUser'
    );

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  }


  getRole(): string | null {

    const user = this.getCurrentUser();

    return user?.role ?? null;
  }


  isLoggedIn(): boolean {

    return this.getCurrentUser() !== null;
  }


  isAdmin(): boolean {

    return this.getRole() === 'ADMIN';
  }


  logout(): void {

    localStorage.removeItem(
      'currentUser'
    );

  }

}