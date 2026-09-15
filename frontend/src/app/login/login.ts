import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    this.authService
      .login(this.email, this.password)
      .subscribe({

        next: (response) => {

          console.log(
            'Login successful:',
            response
          );

          console.log(
            'Logged-in role:',
            response.user.role
          );

          if (response.user.role === 'ADMIN') {

            this.router.navigate([
              '/employees'
            ]);

          } else {

            this.router.navigate([
              '/my-profile'
            ]);

          }

        },

        error: (error: any) => {

          console.error(
            'Login failed:',
            error
          );

          alert(
            'Invalid email or password'
          );

        }

      });

  }

}