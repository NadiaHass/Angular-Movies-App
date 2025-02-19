import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {
  baseUrl: string = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  httpGet(url: string) : any{
    return this.httpClient.get(`${this.baseUrl}/${url}`, {  
      headers: {
        'Authorization': `Bearer ${environment.token}`
      }
    });
  }
}