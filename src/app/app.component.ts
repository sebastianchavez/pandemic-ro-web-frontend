import { Component } from '@angular/core';
import { Menu } from './interfaces/menu.interface';
import { IUser } from './interfaces/user.interface';
import { LoggerService } from './services/logger/logger.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  idLog: string = 'AppComponent'
  title = 'pandemic-ro-web-frontend';
  user?: IUser;
  stateServer: string = 'ON'
  usersOn: number = 0;
  totalUsers: number = 0;
  totalAccounts: number = 0;
  menu: Array<Menu> = [
    {
      name: 'Información',
      router: '/'
    },
    {
      name: 'Descarga',
      router: '/descargas'
    },
    {
      name: 'Panel',
      router: '/cpanel'
    },
    {
      name: 'Foro',
      router: '/foro'
    },
    // {
    //   name: 'Usuario',
    //   router: '/usuario'
    // }
  ]
  backgroundImg: string = 'assets/imgs/311972.jpg'
  constructor(
    private logger: LoggerService,
    private userService: UserService
  ) {
    this.getUserData()
    this.getInfo()
  }

  async getUserData() {
    this.userService.getUser()
      .subscribe(res => {
        this.user = res;
      })
    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser')!)
    }
  }

  async getInfo() {
    try {
      const response = await this.userService.getInfoCpanel()
      let ip 
      try {
        ip = await this.userService.getIp()
      } catch (error) {
        this.logger.error(this.idLog, 'getInfo - getIp', { info: 'Error', error })
      }
      this.stateServer = 'ON'
      this.usersOn = response.connectedUsers
      this.totalUsers = response.totalUsers
      this.totalAccounts = response.totalAccounts
      this.logger.log(this.idLog, 'getInfo', { info: 'Success', response, ip })
    } catch (error) {
      this.stateServer = 'OFF'
      this.logger.error(this.idLog, 'getInfo', { info: 'Error', error })
    }
  }
}
