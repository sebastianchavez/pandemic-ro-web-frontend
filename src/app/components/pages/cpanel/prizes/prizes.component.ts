import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IConnectionUser } from 'src/app/interfaces/connection-user.interface';
import { IPrize } from 'src/app/interfaces/prize.interface';
import { ConnectionUserService } from 'src/app/services/connection-user/connection-user.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { PrizeService } from 'src/app/services/prize/prize.service';

@Component({
  selector: 'app-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PrizesComponent implements OnInit {

  idLog: string = 'PrizesComponent';
  days: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
  prizes: IPrize[] = []
  prizesUser: {
    day: number;
    isReclamed: boolean;
    prizes: IPrize[]
  }[] = []
  loading: boolean = false;
  lastConnection?: IConnectionUser | null = null

  constructor(
    private prizeService: PrizeService,
    private connectionUserService: ConnectionUserService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.getLastConnection()
  }

  async getPrizes(){
    try {
      const response = await this.prizeService.getPrizesConnection()
      this.prizes = response
      this.days.forEach((x, i) => {
        this.prizesUser.push({
          day: x,
          prizes: this.prizes.filter(p => p.day == x),
          isReclamed: this.lastConnection && this.lastConnection.day >= x ? true : false
        })
      })
      this.logger.log(this.idLog, this.getPrizes.name, {info: 'Success' , response})
    } catch (error) {
      this.logger.error(this.idLog, this.getPrizes.name, {info: 'Error' , error})
    }
  }

  async getLastConnection(){
    try {
      const response =await this.connectionUserService.getMyLastConnection()
      this.lastConnection = response;
      this.getPrizes()
      this.logger.log(this.idLog, this.getLastConnection.name, {info: 'Success', response})
    } catch (error) {
      this.logger.error(this.idLog, this.getLastConnection.name, {info: 'Error', error})
    }
  }

}
