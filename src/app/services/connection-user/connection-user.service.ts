import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionUserService {
  private apiUrl: string = environment.apiUrl
  private url1: string = '/api/connection-user/get-my-last-connection'

  constructor(
    private http: HttpClient
  ) { }

  getMyLastConnection(): Promise<any>{
    return firstValueFrom(this.http.get(`${this.apiUrl}${this.url1}`))
  }

}
