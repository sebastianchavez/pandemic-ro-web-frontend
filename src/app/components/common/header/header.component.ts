import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
