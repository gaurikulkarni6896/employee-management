import { Component } from '@angular/core';
import {Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
 constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  logout(): void {

    console.log('Logout clicked');

    this.authService.logout();

    this.router.navigate(['/login']);
  }
}
