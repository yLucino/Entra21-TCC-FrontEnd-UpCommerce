import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ProjectInterface } from "../interfaces/project.interface";
import { environment } from "src/environments/environment.development";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProjectService {

  constructor(private http: HttpClient) {}
  
  getAllProjectByUserId(userId: number): Observable<ProjectInterface[]> {
    return this.http.get<ProjectInterface[]>(`${environment.apiUrl}/Project/user/${userId}`);
  }

  getProjectById(userId: number, id: number): Observable<ProjectInterface> {
    return this.http.get<ProjectInterface>(`${environment.apiUrl}/Project/user/${userId}/${id}`);
  }

  postProject(userId: number, data: ProjectInterface): Observable<ProjectInterface> {
    return this.http.post<ProjectInterface>(`${environment.apiUrl}/Project/user/${userId}`, data);
  }

  putProject(userId: number, id: number, data: ProjectInterface): Observable<ProjectInterface> {
    return this.http.post<ProjectInterface>(`${environment.apiUrl}/Project/user/${userId}/${id}`, data);
  }

  deleteProject(userId: number, id: number): Observable<ProjectInterface> {
    return this.http.delete<ProjectInterface>(`${environment.apiUrl}/Project/user/${userId}/${id}`);
  }
}