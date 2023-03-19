import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MustMatch } from 'src/app/components/helpers/must-match.validator';
import { IAccount, IPlayer, IRequestAccount } from 'src/app/interfaces/account.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-my-accounts',
  templateUrl: './my-accounts.component.html',
  styleUrls: ['./my-accounts.component.scss']
})
export class MyAccountsComponent implements OnInit {
  idLog: string = 'MyAccountsComponent'
  loading: boolean = false
  accounts: IAccount[] = []
  players: IPlayer[] = []
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private logger: LoggerService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getInfo()
  }

  async getInfo() {

    this.loading = true
    try {
      const response = await this.userService.getInfoAccounts()
      this.players = response.loginUser.sort(((a: IPlayer, b: IPlayer) => {
        const nameA = a.name?.toUpperCase() 
        const nameB = b.name?.toUpperCase()
        if (nameA && nameB && (nameA < nameB)) {
          return -1
        }
        if (nameA && nameB && (nameA > nameB)) {
          return 1
        }
        return 0
      }))

      this.accounts = []
      let usersId = [...new Set(this.players.map((x: IPlayer) => x.userid))]
      usersId.forEach((u: string) => {
        let chars = this.players.filter((p:IPlayer) => p.userid == u)
        this.accounts.push({
          genre: chars[0].sex,
          ragnarokId: chars[0].account_id,
          state: chars[0].state == 0 ? 'Habilitado' : 'Deshabilitado',
          user: u,
          pjs: chars[0].name != null ? chars : []
        })
      })
      this.logger.log(this.idLog, 'getInfo - getInfoAccounts', { info: 'Success', response, accounts: this.accounts })
    } catch (error) {
      this.logger.error(this.idLog, 'getInfo - getInfoAccounts', { info: 'Error', error })
    }
    this.loading = false
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

  openPjDialog(account: IAccount){
    if(account.pjs.length == 0){
      this.alertService.alert('No tienes personajes registrados', 'warning')
      return
    }

    const dialogRef = this.dialog.open(DialogContentPj, {
      width: '30rem',
      height: '30rem',
      data: account
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}



@Component({
  selector: 'dialog-content-account',
  templateUrl: 'dialog-content-account.html',
  styleUrls: ['./dialog-content-account.scss']
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

@Component({
  selector: 'dialog-content-pj',
  templateUrl: 'dialog-content-pj.html',
  styleUrls: ['./dialog-content-pj.scss']
})
export class DialogContentPj implements OnInit {

  idLog: string = 'DialogContentPj'

  constructor(
    public dialogRef: MatDialogRef<DialogContentAccount>,
    @Inject(MAT_DIALOG_DATA) public data: IAccount,
  ) { 
    console.log('data:', data);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}