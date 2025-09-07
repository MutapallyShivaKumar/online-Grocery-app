import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  editable: boolean = false;
  successMsg: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const localUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!localUser?.customerId) {
      alert('Session expired. Please login again.');
      this.router.navigate(['/login']);
      return;
    }

    this.http
      .get<any>(`http://localhost:8080/api/users/${localUser.customerId}`)
      .subscribe((data) => (this.user = data));
  }

  enableEditing() {
    this.editable = true;
    this.successMsg = '';
  }

  saveProfile() {
    this.http
      .put(`http://localhost:8080/api/users/${this.user.customerId}`, this.user)
      .subscribe((updated) => {
        this.user = updated;
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.successMsg = 'Profile updated successfully!';
        this.editable = false;
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
