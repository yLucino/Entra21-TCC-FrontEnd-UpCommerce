import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserInterface } from '../interfaces/user.interface';
import { ValidadePassword } from '../interfaces/validatePassword.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${environment.apiUrl}/User/${id}`);
  }

  updateUser(user: UserInterface): Observable<UserInterface> {
    return this.http.put<UserInterface>(`${environment.apiUrl}/User/${user.id}`, user);
  }

  validatePassword(data: ValidadePassword) {
    return this.http.post(`${environment.apiUrl}/User/validate-password`, data);
  }
}