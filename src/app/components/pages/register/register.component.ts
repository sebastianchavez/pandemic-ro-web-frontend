import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRequestRegister } from 'src/app/interfaces/register.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { UserService } from 'src/app/services/user/user.service';
import { MustMatch } from '../../helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  idLog: string = 'RegisterComponent'
  submitted: boolean = false;
  registerForm: FormGroup = new FormGroup({});
  btnLoad: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private logger: LoggerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clearForm()
  }

  get f() {
    return this.registerForm.controls;
  }

  clearForm() {
    this.submitted = false;
    this.registerForm = new FormGroup({});
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  async onSubmit(values: any) {
    this.submitted = true;
    const { email, password } = values

    if (this.registerForm.invalid) {
      return;
    }

    this.btnLoad = true
    try {
      const request: IRequestRegister = {
        email,
        password
      }
      const response = await this.userService.register(request)
      this.logger.log(this.idLog, 'onSubmit', { info: 'Success', response })
      this.clearForm()
      this.alertService.toast('Usuario registrado')
      this.router.navigateByUrl('/login')
    } catch (error: any) {
      const msg = error.error && error.error.message ? error.error.message : 'Problemas al autenticar, por favor intente más tatde'
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, 'onSubmit', { info: 'Error', error })
    }
    this.btnLoad = false
  }
}
