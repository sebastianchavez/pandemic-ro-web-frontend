import { Component, HostListener, Inject } from '@angular/core';
import { Menu } from './interfaces/menu.interface';
import { INews } from './interfaces/news,inferface';
import { IUser } from './interfaces/user.interface';
import { LoggerService } from './services/logger/logger.service';
import { MenuService } from './services/menu/menu.service';
import { NewsService } from './services/news/news.service';
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
      router: '/informacion'
    },
    {
      name: 'Descarga',
      router: '/descargas'
    },
    {
      name: 'Panel',
      router: ''
    },
  ]
  backgroundImg: string = 'assets/imgs/311972.jpg'
  constructor(
    private logger: LoggerService,
    private userService: UserService,
    private menuService: MenuService
    ) {
    this.getUserData()
  }
scroll(ev: any) {
  if(ev.srcElement.scrollTop > 100){
    this.menuService.setTransparent(true)
  } else {
    this.menuService.setTransparent(false)
  }
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
      this.stateServer = 'ON'
      this.usersOn = response.connectedUsers
      this.totalUsers = response.totalUsers
      this.totalAccounts = response.totalAccounts
      this.logger.log(this.idLog, 'getInfo', { info: 'Success', response })
    } catch (error) {
      this.stateServer = 'OFF'
      this.logger.error(this.idLog, 'getInfo', { info: 'Error', error })
    }
  }

  
}
