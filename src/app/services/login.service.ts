import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserTokenInterface } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment.development';
import { LoginInterface } from '../interfaces/login.interface';

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(private http: HttpClient) {}

  login(data: LoginInterface): Observable<UserTokenInterface> {
    return this.http.post<UserTokenInterface>(`${environment.apiUrl}/User/login`, data);
  }
}