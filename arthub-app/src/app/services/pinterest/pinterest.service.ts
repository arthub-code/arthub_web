/**
 * Por enquanto esse serviço esta INDISPONÍVEL.
 * Favor desconsiderar por um tempo indeterminado.
 */

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinterestService {
  private apiUrl = '/pinterest';
  private token = environment.pinterestToken;

  constructor(private http: HttpClient) {}

  searchImages(query: string): Observable<any> {
    const url = `${this.apiUrl}/pins?query=${query}&fields=id,url,created_at&limit=20`;
    console.log("token: " +  this.token)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.pinterestToken}`
    });

    return this.http.get(url, { headers });
  }
}
