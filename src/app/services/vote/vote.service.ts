import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  firstValueFrom } from 'rxjs';
import { IRequestVote } from 'src/app/interfaces/request-vote.interface';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private apiUrl: string = environment.apiUrl
  private url1: string = '/api/vote'
  constructor(
    private http: HttpClient
  ) { }

  vote(request: IRequestVote){
    return firstValueFrom(this.http.put(this.apiUrl + this.url1,request))
  }
}
