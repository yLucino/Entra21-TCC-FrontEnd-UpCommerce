import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { environment } from 'src/environments/environment.development';
import { LoginInterface } from '../interfaces/login.interface';

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(private http: HttpClient) {}

  login(data: LoginInterface): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/User/login`, data);
  }
}