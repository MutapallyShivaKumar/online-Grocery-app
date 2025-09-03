import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginType = 'customer';
  id = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.loginType === 'customer') {
      this.authService.loginCustomer(this.id, this.password).subscribe({
        next: (res) => {
          // Save current user to session/local storage if needed
          localStorage.setItem('currentUser', JSON.stringify(res));

          // Redirect to customer home
          this.router.navigate(['/customer-home']);
        },
        error: () => (this.errorMessage = 'Invalid Customer credentials'),
      });
    } else if (this.loginType === 'admin') {
      this.authService.loginAdmin(this.id, this.password).subscribe({
        next: (res) => {
          localStorage.setItem('currentAdmin', JSON.stringify(res));

          // Redirect to admin dashboard
          this.router.navigate(['/admin-dashboard']);
        },
        error: () => (this.errorMessage = 'Invalid Admin credentials'),
      });
    }
  }
}
