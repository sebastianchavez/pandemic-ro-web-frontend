import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/interfaces/news,inferface';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  idLog: string = 'UserComponent'
  news: INews[] = [
    {
      "idNews":1,
      "image":"https://pandemic-ro-storage.s3.us-east-2.amazonaws.com/dev/news/1678802433792.jpg",
      "inWeb":true,
      "inClient":true,
      "inSlide":true,
      "link":"",
      "startDate":null,
      "endDate":null,
      "description":"Informacion rates de server",
      "createdAt":new Date("2023-03-14T10:42:47.238Z"),
    },
    {
      "idNews":2,
      "image":
      "https://pandemic-ro-storage.s3.us-east-2.amazonaws.com/dev/news/1678802445478.jpg",
      "inWeb":true,
      "inClient":true,
      "inSlide":true,
      "link":"",
      "startDate":null,
      "endDate":null,
      "description":"Sistemas de eventos del server",
      "createdAt": new Date("2023-03-14T10:43:16.853Z"),
    },
    {
      "idNews":3,
      "image":"https://pandemic-ro-storage.s3.us-east-2.amazonaws.com/dev/news/1678802456026.jpg",
      "inWeb":true,
      "inClient":true,
      "inSlide":true,
      "link":"",
      "startDate":null,
      "endDate":null,
      "description":"Premios que se dan normalmente por donaciones",
      "createdAt": new Date("2023-03-14T10:43:55.214Z"),
    }
  ]

  constructor(
    private newsService: NewsService,
    private logger: LoggerService,
    ) {
    this.getNews()
   }

  ngOnInit(): void {
  }

  async getNews(){
    try {
      const query = '?limit=10&page=1'
      const response = await this.newsService.getNews(query)
      this.news = response.news
      this.logger.log(this.idLog, this.getNews.name, {info: 'Success', response})
    } catch (error) {
      this.logger.error(this.idLog, this.getNews.name, {info: 'Error', error})
    }
  }
}
