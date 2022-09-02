import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {
  version: string = '0.1 (BETA)'
  constructor() { }

  ngOnInit(): void {
  }

  goToClientDownload() {
    window.location.href = 'https://drive.google.com/file/d/1jiSZnis-iNjMFuqFU_1YFMHVN5_ceP3N/view?fbclid=IwAR19ayNx7eXlKPQH9Q18bIzvEnJnA_LnMfS2jStQNT-t00P13kogSxBqF2s'
  }

}
