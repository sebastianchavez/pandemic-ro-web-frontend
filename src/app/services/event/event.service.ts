import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  apiUrl: string = environment.apiUrl
  url1: string = '/api/events/get-events'

  constructor(
    private http: HttpClient
  ) { }

  getEvents(): Promise<any> {
    return lastValueFrom(this.http.get(`${this.apiUrl}${this.url1}?limit=0&page=1`))
  }
}
