import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {

  private apiUrl: string = environment.apiUrl
  private url1: string = '/api/prizes/get-prizes'

  constructor(
    private http: HttpClient
  ) { }

  getPrizesConnection(): Promise<any>{
    return lastValueFrom(this.http.get(`${this.apiUrl}${this.url1}`))
  }

}
