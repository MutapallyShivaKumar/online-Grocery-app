import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  customer = { name: '', email: '', password: '', address: '', contact: '' };
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Generate Customer ID in frontend
  private generateCustomerId(): string {
    return 'CID' + Math.floor(100000 + Math.random() * 900000);
  }

  onRegister() {
    const customerWithId = {
      ...this.customer,
      customerId: this.generateCustomerId(),
    };

    this.authService.registerCustomer(customerWithId).subscribe({
      next: () => {
        this.successMessage = `
          Registration successful!<br>
          Customer ID: <strong>${customerWithId.customerId}</strong><br>
          Name: ${customerWithId.name}<br>
          Email: ${customerWithId.email}
        `;
        this.errorMessage = '';
        this.customer = {
          name: '',
          email: '',
          password: '',
          address: '',
          contact: '',
        }; // reset form

        // Redirect after 2 seconds
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.errorMessage = 'Registration failed. Try again!';
        this.successMessage = '';
      },
    });
  }
}
