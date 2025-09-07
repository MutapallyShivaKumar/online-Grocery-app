import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  user: any = JSON.parse(localStorage.getItem('currentUser') || '{}');
  total: number = 0;
  orderSuccess: boolean = false;
  orderInvoice: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    if (!this.user?.customerId) {
      alert('Session expired. Please login again.');
      this.router.navigate(['/login']);
      return;
    }
    this.loadCart();
  }

  loadCart() {
    this.http
      .get<any[]>(`http://localhost:8080/api/cart/${this.user.customerId}`)
      .subscribe((data) => {
        this.cart = data;
        this.total = this.cart.reduce((sum, item) => sum + item.price, 0);
      });
  }

  removeItem(productId: number) {
    this.http
      .delete(
        `http://localhost:8080/api/cart/${this.user.customerId}/${productId}`
      )
      .subscribe(() => this.loadCart());
  }

  checkout() {
    this.http
      .post('http://localhost:8080/api/orders', {
        customerId: this.user.customerId,
        items: this.cart,
      })
      .subscribe((order) => {
        this.orderSuccess = true;
        this.orderInvoice = order;
        this.cart = [];
        this.total = 0;
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
