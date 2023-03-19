import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiUrl: string = environment.apiUrl
  url1: string = '/api/news/get-news'

  constructor(
    private http: HttpClient
  ) { }
  
  getNews(query: string): Promise<any>{
    return lastValueFrom(this.http.get(`${this.apiUrl}${this.url1}${query}`))
  }

}
