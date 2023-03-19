import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRequestVote } from 'src/app/interfaces/request-vote.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { UserService } from 'src/app/services/user/user.service';
import { VoteService } from 'src/app/services/vote/vote.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  loading = {
    rank1: false,
    rank2: false,
    rank3: false
  }
  idLog: string = 'HomeComponent'
  backgroundImg: string = 'assets/imgs/background_home.jpg'
  
  constructor(
    private alertService: AlertService,
    private logger: LoggerService,
    private voteService: VoteService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  async confirmVote(rank: number, url: string){
    if(!localStorage.getItem('isLogin')){
      try {
        const confirm = await this.alertService.confirm('Necesitas estar autenticado para recibir tus puntos de votación!', 'warning', 'Autenticarse', 'Votar de todas formas')
        console.log({confirm});
        
        if(confirm.value){
          this.router.navigateByUrl('/login')
        } else if(confirm.dismiss && confirm.dismiss == Swal.DismissReason.cancel){
          window.location.href = url
        }
      } catch (error) {
        this.logger.error(this.idLog, this.confirmVote.name, {info: 'Error', error})
      }
    } else {
      this.vote(rank, url)
    }
  }

  async vote(rank: number, url: string){
    switch(rank){
      case 1:
        this.loading.rank1 = true
        break;
      case 2:
        this.loading.rank2 = true
        break;
      case 3:
        this.loading.rank3 = true
        break;
    }
    try {
      const responseIp = await this.userService.getIp()
      this.logger.log(this.idLog, this.vote.name, {info: 'Success', responseIp})
      const user = JSON.parse(localStorage.getItem('currentUser')!)
      const request :IRequestVote = {
        email: user.email,
        ip: responseIp.ip,
        rank
      }
      const responseVote = await this.voteService.vote(request)
      this.logger.log(this.idLog, this.vote.name, {info: 'Success', responseVote})
      window.location.href = url
    } catch (error: any) {
      const msg = error.error && error.error.message ? error.error.message : 'Problemas al votar, intente más tarde o contacte al administrador'
      this.alertService.alert(msg, 'error')
      this.logger.error(this.idLog, this.vote.name, {info: 'Error', error})
    }
    switch(rank){
      case 1:
        this.loading.rank1 = false
        break;
      case 2:
        this.loading.rank2 = false
        break;
      case 3:
        this.loading.rank3 = false
        break;
    }
  }
}
