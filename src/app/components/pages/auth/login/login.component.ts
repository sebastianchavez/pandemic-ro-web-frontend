import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private router: Router,
    public dialog: MatDialog,
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
      this.router.navigateByUrl('/cpanel/cuentas')
    } catch (error: any) {
      const msg = error.error && error.error.message ? error.error.message : 'Problemas al autenticar, por favor intente más tatde'
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, 'onSubmit', { info: 'Error', error })
    }
    this.btnLoad = false
  }

  openDialogRecovery() {
    const dialogRef = this.dialog.open(DialogContentRecovery, {
      width: '30rem',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


@Component({
  selector: 'recovery-password',
  templateUrl: 'recovery-password.html',
  styleUrls: ['./login.component.scss']
})
export class DialogContentRecovery implements OnInit {

  idLog: string = 'DialogContentAccount'
  submitted: boolean = false;
  recoveryPassForm: FormGroup = new FormGroup({});
  btnLoad: boolean = false;
  genres: any[] = [
    {
      text: 'Femenino',
      value: 'F'
    },
    {
      text: 'Masculino',
      value: 'M'
    }
  ]

  constructor(
    public dialogRef: MatDialogRef<DialogContentRecovery>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private logger: LoggerService,
    private userService: UserService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.clearForm()
  }

  get f() {
    return this.recoveryPassForm.controls;
  }

  clearForm() {
    this.submitted = false;
    this.recoveryPassForm = new FormGroup({});
    this.recoveryPassForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit(values: any) {
    this.submitted = true;
    const { email } = values

    if (this.recoveryPassForm.invalid) {
      return;
    }

    this.btnLoad = true
    try {
      
      const response = await this.userService.recoveryPassword(email)
      this.logger.log(this.idLog, 'onSubmit', { info: 'Success', response })
      this.alertService.toast('Usuario registrado')
      this.dialogRef.close()
    } catch (error: any) {
      const msg = error.error && error.error.message ? error.error.message : 'Problemas al autenticar, por favor intente más tatde'
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, 'onSubmit', { info: 'Error', error })
    }
    this.btnLoad = false
  }
}
