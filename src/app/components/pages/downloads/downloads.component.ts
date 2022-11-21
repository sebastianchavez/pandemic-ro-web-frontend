import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {
  version: string = '1.0'
  constructor() { }

  ngOnInit(): void {
  }

  goToClientDownload() {
    window.location.href = 'https://pandemic-ro-storage.s3.us-east-2.amazonaws.com/clients/Cliente+Pandemic+Ro+Setup+1.0+-+32.exe'
  }

  goToRoClientDownload(option: number) {
    switch(option){
      case 1:
        window.location.href = 'https://drive.google.com/file/d/1YrM90EJ3jAIgsmn7BQcQ_Hf4oRvETv3W/view?usp=sharing'
        break;
      case 2:
        window.location.href = 'https://mega.nz/file/BsZwSSJZ#gnsqT8AYcoAzqELtFsCuwXPp1xbVeOpfhS-2NNMoBao'
        break;
      case 3:
        window.location.href = 'https://www.mediafire.com/file/sxnfzckcfwebk5s/PandemicRo_v1.0.zip/file'
        break;
      }
  }

}
