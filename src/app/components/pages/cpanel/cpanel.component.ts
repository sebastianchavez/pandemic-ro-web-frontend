import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAccount, IRequestAccount } from 'src/app/interfaces/account.interface';
import { AccountService } from 'src/app/services/account/account.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { UserService } from 'src/app/services/user/user.service';
import { MustMatch } from '../../helpers/must-match.validator';

@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.scss']
})
export class CpanelComponent implements OnInit {

  idLog: string = 'CpanelComponent'
  stateServer: string = 'ON'
  usersOn: number = 0;
  totalUsers: number = 0;
  accounts: IAccount[] = []
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.getInfo()
  }

  async getInfo() {
    try {
      const response = await this.userService.getInfoCpanel()
      this.stateServer = 'ON'
      this.usersOn = response.connectedUsers
      this.totalUsers = response.totalUsers
      this.logger.log(this.idLog, 'getInfo - getInfoCpanel', { info: 'Success', response })
    } catch (error) {
      this.stateServer = 'OFF'
      this.logger.error(this.idLog, 'getInfo - getInfoCpanel', { info: 'Error', error })
    }
    try {
      const response = await this.userService.getInfoAccounts()
      this.accounts = response;
      this.logger.log(this.idLog, 'getInfo - getInfoAccounts', { info: 'Success', response })
    } catch (error) {
      this.logger.error(this.idLog, 'getInfo - getInfoAccounts', { info: 'Error', error })
    }
  }
  openDialogRegister() {
    const dialogRef = this.dialog.open(DialogContentAccount, {
      width: '30rem',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getInfo()
      console.log(`Dialog result: ${result}`);
    });
  }
}


@Component({
  selector: 'dialog-content-account',
  templateUrl: 'dialog-content-account.html',
  styleUrls: ['./cpanel.component.scss']
})
export class DialogContentAccount implements OnInit {

  idLog: string = 'DialogContentAccount'
  submitted: boolean = false;
  registerForm: FormGroup = new FormGroup({});
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
    public dialogRef: MatDialogRef<DialogContentAccount>,
    @Inject(MAT_DIALOG_DATA) public data: IAccount,
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
    return this.registerForm.controls;
  }

  clearForm() {
    this.submitted = false;
    this.registerForm = new FormGroup({});
    this.registerForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      genre: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  async onSubmit(values: any) {
    this.submitted = true;
    const { user, password, genre } = values

    if (this.registerForm.invalid) {
      return;
    }

    this.btnLoad = true
    try {
      const request: IRequestAccount = {
        userid: user,
        user_pass: password,
        sex: genre,
        last_ip: '0.0.0.0'
      }
      const response = await this.userService.registerAccount(request)
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
