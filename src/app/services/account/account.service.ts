import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequestAccount } from 'src/app/interfaces/account.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }


}
