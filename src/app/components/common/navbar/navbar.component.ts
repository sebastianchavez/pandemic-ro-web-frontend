import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() menu: Array<Menu> = []
  @Input() user?: IUser;
  state: boolean = false;
  transparent: boolean = false;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private menuService: MenuService
    ) { }

  ngOnInit(): void {
    this.menuService.getTransparent()
      .subscribe(res => {
        this.transparent = res
      })
  }

  navigateToPage(path: string) {
    if(path != ''){
      this.router.navigate([path])
    }
  }

  changeState() {
    this.state = !this.state;
  }

  async logOut() {
    const confirm = await this.alertService.confirm('¿Desea cerrar sesión?', 'question', 'Si', 'No')
    if (confirm.value) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('isLogin')
      localStorage.removeItem('currentUser')
      this.router.navigateByUrl('/login')
      this.userService.setUser(null)
    }
  }
}
