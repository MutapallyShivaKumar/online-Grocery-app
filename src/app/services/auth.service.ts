import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080'; // Your Spring Boot backend URL

  constructor(private http: HttpClient) {}

  registerCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register`, customer);
  }

  loginCustomer(customerId: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, {
      customerId,
      password,
    });
  }

  loginAdmin(adminId: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/login`, { adminId, password });
  }
}
