import { Injectable } from '@angular/core';
import { IRequestRegister } from 'src/app/interfaces/register.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/interfaces/user.interface';
import { IRequestAccount } from 'src/app/interfaces/account.interface';
import { IRequestLogin } from 'src/app/interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = environment.apiUrl
  private url1: string = '/api/users/register'
  private url2: string = '/api/users/login'
  private url3: string = '/api/users/get-info'
  private url4: string = '/api/users/get-accounts'
  private url5: string = '/api/users/register-account'
  private url6: string = 'http://api.ipify.org/?formsat=json'
  private url7: string = '/api/users/recovery-password'

  user: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient
  ) { }

  register(request: IRequestRegister): Promise<any> {
    return firstValueFrom(this.http.post(this.apiUrl + this.url1, request))
  }

  login(request: IRequestLogin): Promise<any> {
    return firstValueFrom(this.http.post(this.apiUrl + this.url2, request))
  }

  setUser(user: IUser | null) {
    this.user.next(user)
  }
  getUser() {
    return this.user.asObservable()
  }

  getInfoCpanel(): Promise<any> {
    return firstValueFrom(this.http.get(this.apiUrl + this.url3))
  }

  getInfoAccounts(): Promise<any> {
    return lastValueFrom(this.http.get(this.apiUrl + this.url4))
  }

  registerAccount(request: IRequestAccount): Promise<any> {
    return firstValueFrom(this.http.post(this.apiUrl + this.url5, request))
  }

  getIp(){
    return firstValueFrom(this.http.get(this.url6))
  }

  recoveryPassword(email: string){
    return firstValueFrom(this.http.put(this.url7,{ email }))
  }
}
