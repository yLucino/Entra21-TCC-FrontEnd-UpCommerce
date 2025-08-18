import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment.development';
import { LoginInterface } from '../interfaces/login.interface';

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(private http: HttpClient) {}

  login(data: LoginInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(`${environment.apiUrl}/User/login`, data);
  }
}