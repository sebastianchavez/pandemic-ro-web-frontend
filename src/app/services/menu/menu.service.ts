import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  transparent: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor() { }

  setTransparent(transparent: boolean) {
    this.transparent.next(transparent)
  }

  getTransparent() {
    return this.transparent.asObservable()
  }
}
