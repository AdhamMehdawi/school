import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getUserById(userId: Number) {
    return this.http.get(
      'https://jsonplaceholder.typicode.com/users/' + userId
    );
  }
}
