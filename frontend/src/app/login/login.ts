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

          this.router.navigate([
            '/employees'
          ]);

        },

        error: (error) => {

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