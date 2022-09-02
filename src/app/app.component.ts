import { Component } from '@angular/core';
import { Menu } from './interfaces/menu.interface';
import { IUser } from './interfaces/user.interface';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pandemic-ro-web-frontend';
  user?: IUser;
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
    private userService: UserService
  ) {
    this.getUserData()
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
}
