import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.development';
import { RegisterInterface } from '../interfaces/register.interface';
import { RegisterResponse } from '../interfaces/registerResponse.interface';

@Injectable({ providedIn: 'root' })
export class RegisterService {

  constructor(private http: HttpClient) {}

  register(data: RegisterInterface): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/User/register`, data);
  }
}