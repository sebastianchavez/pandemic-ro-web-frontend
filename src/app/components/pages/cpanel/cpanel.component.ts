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
  menu: number = 0;
  menus: {
    value: number;
    text: string;
  }[] = [
    {
      value: 0,
      text: 'Mis cuentas'
    },
    {
      value: 1,
      text: 'Premios'
    },
    // {
    //   value: 2,
    //   text: 'Ranking'
    // }
  ];
  constructor(
  ) { }

  ngOnInit(): void {
  }

  
  
}

