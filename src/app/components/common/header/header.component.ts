import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INews } from 'src/app/interfaces/news,inferface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() news: INews[] = []

  cards: {
    text: string;
    icon: string;
    router: string;
  }[] = [
    {
      text: 'Información',
      icon: 'info_outline',
      router: 'informacion'
    },
    {
      text: 'Eventos Automáticos',
      icon: 'event',
      router: 'eventos'
    },
    {
      text: 'Actualizaciones',
      icon: 'upgrade',
      router: 'actualizacion'
    },
    {
      text: 'Seguridad',
      icon: 'security',
      router: 'seguridad'
    }
  ]
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToPage(path: string){
    this.router.navigateByUrl(path)
  }

  goToFb() {
    window.location.href = 'https://www.facebook.com/groups/582448106708460'
  }

  goToInstagram() {
    window.location.href = 'https://www.instagram.com/pandemic.ro/'
  }

  goToDiscord() {
    window.location.href = 'https://discord.gg/Jqt4tsbJQz'
  }
}
