import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:8080/useraccount/v1/public'; 
  private isBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId); 
  }

  login(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, payload);
  }

  saveToken(token: string) {
    if (this.isBrowser) {
      localStorage.setItem('jwtToken', token); 
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('jwtToken');
    }
  }
}
