import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from 'src/app/interfaces/event.interface';
import { IRequestVote } from 'src/app/interfaces/request-vote.interface';
import { AlertService } from 'src/app/services/alert/alert.service';
import { EventService } from 'src/app/services/event/event.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { UserService } from 'src/app/services/user/user.service';
import { VoteService } from 'src/app/services/vote/vote.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  idLog: string = 'HomeComponent'
  loading = {
    rank1: false,
    rank2: false,
    rank3: false
  }
  events: IEvent[] = [];
  today: string = new Date().getDay().toString()
  serverDate: Date = new Date();
  hour: number = new Date().getHours() * 100
  backgroundImg: string = 'assets/imgs/background_home.jpg'
  images: string[] = [
    'assets/imgs/slider01.jpg',
    'assets/imgs/slider02.jpg',
    'assets/imgs/slider03.jpg',
  ]
  prizes: {
    img: string;
    title: string;
    description: string;
  }[] = [
    {
      img: 'assets/imgs/rwcgold.gif',
      title: 'Hats Especiales',
      description: 'Compra Hats especiales que normalmente compras donando, pero esta vez jugando...'
    },
    {
      img: 'assets/imgs/red_strong.gif',
      title: 'Items Costumes',
      description: 'Canjea Event Tickets por Items Costumes disponibles en el servidor'
    },
    {
      img: 'assets/imgs/bloody_branch.gif',
      title: 'Premios diarios',
      description: 'Consigue premios conectandote diariamente'
    },
    {
      img: 'assets/imgs/montura.png',
      title: 'Montura',
      description: 'Vota por el servidor y canjea tu montura'
    }
  ]

  instances: {
    img: string;
    title: string;
    description: string;
  }[] = [
    {
      img: 'assets/imgs/endless.png',
      title: 'Endless Tower',
      description: 'Recorre los 100 pisos de Endless Tower y lucha contra diversos Mobs y MVP’s'
    }
  ]
  slides: any[][] = []

  constructor(
    private alertService: AlertService,
    private logger: LoggerService,
    private voteService: VoteService,
    private router: Router,
    private userService: UserService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.getEvents()
    this.prepareSlides()
  }

  async getEvents(){
    this.events = []
    try {
      const response = await this.eventService.getEvents()
      this.serverDate = new Date(response.serverDate.split('.')[0])
      this.hour = this.serverDate.getHours() * 100

      const eventList: IEvent[] = [] 
      let count: number = 0;
      let maxCount = 8

      await Promise.all(response.events.map((x: IEvent, i: number) => {
        if(x.days.toString().includes(this.today)){
          if(x.endHour >= this.hour && count < maxCount){
            count++
            let start = x.startHour.toString()
            let end = x.endHour.toString()
            x.hour = `${start.length > 1 ? `Hoy de ${start.substring(0,start.length-2) + ':' + start.substring(start.length-2)}` : `Hoy de 00:00`} ${(Number(end) - Number(start)) > 0 ? ` hasta las ${end.substring(0,end.length-2) + ':' + end.substring(end.length-2)} hora server`: 'hora server' }`
            eventList.push(x)
          }
        }
      }))

      this.events = eventList.sort((a, b) => {
        return a.startHour - b.startHour
      })

      const secondEventList: IEvent[] = [] 

      if(eventList.length < maxCount){
        await Promise.all(response.events.map((x: IEvent, i: number) => {
          if(x.days.toString().includes((Number(this.today)+1).toString())){
            if(count < maxCount){
              count++
              let start = x.startHour.toString()
              let end = x.endHour.toString()
              x.hour = `${start.length > 1 ? `Mañana de ${start.substring(0,start.length-2) + ':' + start.substring(start.length-2)}` : `Mañana de 00:00`} ${(Number(end) - Number(start)) > 0 ? ` hasta las ${end.substring(0,end.length-2) + ':' + end.substring(end.length-2)} hora server`: 'hora server' }`
              secondEventList.push(x)
            }
          }
        }))
      }

      const sortSecondEvents = secondEventList.sort((a, b) => {
        return a.startHour - b.startHour
      })

      sortSecondEvents.forEach(x => {
        this.events.push(x)
      })
     
      this.logger.log(this.idLog, this.getEvents.name, {info: 'Success', response, events: this.events, serverDate: this.serverDate, hour: this.hour})
    } catch (error) {
      this.logger.error(this.idLog, this.getEvents.name, {info: 'Error', error})
    }
  }
 
  async prepareSlides(){
    this.slides = []
    let slide: any[] = [];
    await Promise.all(this.prizes.map((x: any, i: number) => {
      console.log('window.innerWidth:',window.innerWidth);
      
      if(window.innerWidth <= 800 && window.innerWidth > 700){
        if(i > 0 && i % 2 == 0){
          this.slides.push(slide)
          slide = []
        }
      } else if (window.innerWidth <= 700) {
        if(i > 0 && i % 1 == 0){
          this.slides.push(slide)
          slide = []
        }
      } else {
        if(i > 0 && i% 4 == 0){
          this.slides.push(slide)
          slide = []
        }
      }
      slide.push(x)
    }))
    console.log('slides:', this.slides);
    
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
