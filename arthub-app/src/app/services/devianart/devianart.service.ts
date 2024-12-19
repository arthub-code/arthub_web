import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/enviroment';
import IMediaSeacher from '../../types/IMediaSeacher';
import ObjectSearch from '../../model/ObjectSearch';


// Interface para os dados do autor
interface Author {
  userid: string;
  username: string;
  usericon: string;
  type: string;
  is_watching: boolean;
}

// Interface para os dados de estatísticas
interface Stats {
  comments: number;
  favourites: number;
}

// Interface para as imagens
interface PreviewImage {
  src: string;
  height: number;
  width: number;
  transparency: boolean;
}

// Interface para os resultados
interface Result {
  deviationid: string;
  printid: string | null;
  url: string;
  title: string;
  is_favourited: boolean;
  is_deleted: boolean;
  is_published: boolean;
  is_blocked: boolean;
  author: Author;
  stats: Stats;
  published_time: string;
  allows_comments: boolean;
  preview: PreviewImage;
  content: PreviewImage;
  thumbs: PreviewImage[];
}

// Interface para a resposta completa
interface ApiResponse {
  has_more: boolean;
  next_offset: number;
  next_cursor: string;
  results: Result[];
}

@Injectable({
  providedIn: 'root'
})
export class DevianArtService implements IMediaSeacher {
  private apiUrl = '/devianart';
  private authToken: string | null = null;
  private tokenExpiration: number | null = null;
  private isRefreshingToken = false;
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) { }

  private getToken(): Observable<void> {
    const body = new HttpParams()
    .set('grant_type', 'client_credentials')
    .set('client_id', environment.devianArtClientId)
    .set('client_secret', environment.devianArtClientSecret);

    return this.http.post<any>(`${this.apiUrl}/oauth2/token`, body).pipe(
      tap(response => {
        this.authToken = response.access_token;
        this.tokenExpiration = Date.now() + response.expires_in * 1000;
        this.tokenSubject.next(this.authToken);
      }),
      catchError(err => {
        console.error('Erro ao obter token:', err);
        return throwError(() => err);
      })
    );
  }

  private refreshTokenIfNeeded(): Observable<string | null> {
    if (this.authToken && this.tokenExpiration && Date.now() < this.tokenExpiration) {
      return new BehaviorSubject<string | null>(this.authToken).asObservable();
    }

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      return this.getToken().pipe(
        switchMap(() => {
          this.isRefreshingToken = false;
          return this.tokenSubject.asObservable();
        }),
        catchError((err) => {
          this.isRefreshingToken = false;
          this.tokenSubject.next(null);
          return throwError(() => err);
        })
      );
    }

    return this.tokenSubject.asObservable();
  }

  searchImage(query: string, offset: string): Observable<ObjectSearch[]> { // Retorno ajustado para Observable<ObjectSearch[]>
    return this.refreshTokenIfNeeded().pipe(
      switchMap((token) => {
        if (!token) {
          throw new Error('Token de autenticação não disponível');
        }

        const url = `${this.apiUrl}/api/v1/oauth2/browse/tags`;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });

        const params = new HttpParams()
          .set('tag', query)
          .set('offset', offset)
          .set('limit', '6');

          return this.http.get<ApiResponse>(url, { headers, params }).pipe(
            map((response: ApiResponse) => {
              return response.results.map((r: Result) => new ObjectSearch(
                r.thumbs[1].src || '',
                r.content.src || '',
                r.title || ''
              ));
            }),
            catchError(err => {
              console.error('Erro ao buscar imagens:', err);
              return throwError(() => err);
            })
          );
      })
    );
  }
}
