import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  user: any = JSON.parse(localStorage.getItem('currentUser') || '{}');

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    if (!this.user?.customerId) {
      alert('Session expired. Please login again.');
      this.router.navigate(['/login']);
      return;
    }

    this.http
      .get<any[]>('http://localhost:8080/api/products')
      .subscribe((data) => {
        this.products = data;
      });
  }

  addToCart(productId: number) {
    this.http
      .post(`http://localhost:8080/api/cart/${this.user.customerId}`, {
        productId,
      })
      .subscribe(() => {
        alert('Product added to cart.');
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
