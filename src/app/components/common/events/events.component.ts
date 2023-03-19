import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'src/app/interfaces/event.interface';
import { EventService } from 'src/app/services/event/event.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  @Input() events: IEvent[] = []
  @Input() serverDate: Date = new Date()

  constructor(
  ) { }

  serverHour: string = ''

  ngOnInit(): void {
    this.setDate()
  }

  setDate(){
    setInterval(() => {
      this.serverDate.setSeconds(this.serverDate.getSeconds() + 1)
      this.serverHour = this.serverDate.toLocaleTimeString()
    }, 1000)
  }

}
