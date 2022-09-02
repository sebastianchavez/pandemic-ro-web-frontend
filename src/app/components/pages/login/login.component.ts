import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRequestLogin } from 'src/app/interfaces/login.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  idLog: string = 'LoginComponent'
  submitted: boolean = false;
  loginForm: FormGroup = new FormGroup({});
  btnLoad: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private logger: LoggerService,
    private alertService: AlertService,
    private router: Router
  ) { }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.clearForm()
  }

  clearForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(values: any) {
    this.submitted = true;
    const { email, password } = values

    if (this.loginForm.invalid) {
      return;
    }

    this.btnLoad = true
    try {
      const request: IRequestLogin = {
        email,
        password
      }
      const response = await this.userService.login(request)
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('currentUser', JSON.stringify(response.currentUser))
      localStorage.setItem('isLogin', 'true')
      this.logger.log(this.idLog, 'onSubmit', { info: 'Success', response })
      this.clearForm()
      this.userService.setUser(response.currentUser)
      this.alertService.toast('Usuario registrado')
      this.router.navigateByUrl('/cpanel')
    } catch (error: any) {
      const msg = error.error && error.error.message ? error.error.message : 'Problemas al autenticar, por favor intente más tatde'
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, 'onSubmit', { info: 'Error', error })
    }
    this.btnLoad = false
  }
}
